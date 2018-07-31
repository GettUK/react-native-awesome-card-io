import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
  Platform,
  Dimensions,
  ScrollView
} from 'react-native';

import styles from './styles';

const visibleHeight = Dimensions.get('window').height;

class SlidingUpPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backdropAvailable: this.props.showBackdrop
    };

    const { bottom } = this.props.draggableRange;

    this.animatedValueY = -bottom;
    this.translateYAnimation = new Animated.Value(this.animatedValueY);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => false
    });
  }

  componentDidMount() {
    this.translateYAnimation.addListener(this.onDrag);

    if (this.props.visible) {
      this.transitionTo(-this.props.draggableRange.bottom, () => {}, 0);
    }
  }

  componentDidUpdate({ opened, draggableRange }) {
    const { bottom } = this.props.draggableRange;

    this.controlStatePanel('opened', { opened, draggableRange });
    this.controlStatePanel('closed', { opened, draggableRange });

    if (bottom !== draggableRange.bottom) {
      this.animatedValueY = -bottom;
    }

    if (this.animatedValueY !== -bottom && !this.props.visible) {
      this.translateYAnimation.setValue(-bottom);
    }
  }

  controlStatePanel(type, { opened, draggableRange }) {
    const { opened: openedProps } = this.props;
    const { top, bottom } = draggableRange;
    const isOpened = type === 'opened';

    if ((isOpened ? openedProps : !openedProps) &&
      (isOpened ? !opened : opened)
    ) {
      this.transitionTo(-(isOpened ? top : bottom), () => {
        if (!isOpened) { this.setState({ backdropAvailable: isOpened }); }
      });

      this.previousTop = -(isOpened ? bottom : top);
    }
  }

  onStartShouldSetPanResponder = () => {
    if (this.previousTop !== -this.props.draggableRange.bottom) {
      this.setState({ backdropAvailable: true });

      this.props.onActivate();
    }

    this.previousTop = this.animatedValueY;

    return (
      this.props.allowDragging && this.isInsideDraggableRange(this.animatedValueY)
    );
  };

  onMoveShouldSetPanResponder = (evt, gestureState) => (
    this.props.allowDragging &&
      this.isInsideDraggableRange(this.animatedValueY) &&
      Math.abs(gestureState.dy) > 1
  );

  onPanResponderGrant = () => {
    this.translateYAnimation.setOffset(this.animatedValueY);
    this.translateYAnimation.setValue(0);
    this.props.onDragStart(-this.animatedValueY);
  };

  onPanResponderMove = (evt, gestureState) => {
    if (!this.isInsideDraggableRange(this.animatedValueY)) {
      return;
    }

    this.translateYAnimation.setValue(gestureState.dy);
  };

  onPanResponderRelease = () => {
    if (!this.isInsideDraggableRange(this.animatedValueY)) {
      return;
    }

    this.translateYAnimation.flattenOffset();

    this.props.onDragEnd(-this.animatedValueY);
    const { bottom, top } = this.props.draggableRange;

    if (this.previousTop !== -bottom) {
      this.props.onClose();
    }

    this.transitionTo(this.previousTop === -bottom ? -top : -bottom, () => {});
  };

  isInsideDraggableRange = (value) => {
    const { bottom, top } = this.props.draggableRange;

    return value >= -top && value <= -bottom;
  };

  onDrag = ({ value }) => {
    if (this.isInsideDraggableRange(value)) {
      this.animatedValueY = value;
      this.props.onDrag(value);
    }

    if (value >= -this.props.draggableRange.bottom) {
      this.props.onRequestClose();
    }
  };

  transitionTo = (value, onAnimationEnd = () => {}) => {
    const animationConfig = {
      toValue: -Math.abs(value),
      duration: 260,
      delay: Platform.OS === 'android' ? 166.67 : 10
    };

    Animated.timing(this.translateYAnimation, animationConfig).start(onAnimationEnd);
  };

  requestClose = () => {
    const { bottom, top } = this.props.draggableRange;

    this.previousTop = -top;

    if (this.animatedValueY === -bottom) {
      return this.props.onRequestClose();
    }

    return this.transitionTo(-bottom, () => {
      this.setState({ backdropAvailable: false });
      this.props.onClose();
      this.props.onRequestClose();
    });
  };

  get backdropOpacity() {
    const { top, bottom } = this.props.draggableRange;

    return this.translateYAnimation.interpolate({
      inputRange: [-top, -bottom],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });
  }

  get animatedContainerStyles() {
    const height = this.props.height;

    const { top, bottom } = this.props.draggableRange;
    const translateY = this.translateYAnimation.interpolate({
      inputRange: [-top, -bottom],
      outputRange: [-top, -bottom],
      extrapolate: 'clamp'
    });

    const transform = { transform: [{ translateY }] };

    return [
      styles.animatedContainer,
      this.props.contentStyle,
      transform,
      { height, top: visibleHeight, bottom: -visibleHeight + height }
    ];
  }

  renderBackdrop = () => {
    if (!this.props.showBackdrop && !this.state.backdropAvailable) return null;

    return (
      <Animated.View style={[styles.backdrop, { opacity: this.backdropOpacity }]} />
    );
  };

  renderCloseButton = () => {
    if (!this.props.showBackdrop && !this.state.backdropAvailable) return null;

    return (
      <Animated.View style={[styles.closeButton, { opacity: this.backdropOpacity }]}>
        <TouchableWithoutFeedback onPress={this.requestClose}>
          <View>
            {this.props.closeButton}
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  };

  renderHeader = () => {
    if (!this.props.showBackdrop && !this.state.backdropAvailable) return null;

    return (
      <Animated.View style={[styles.header, { opacity: this.backdropOpacity }]}>
        {this.props.header}
      </Animated.View>
    );
  };

  renderContent = () => (
    <Animated.View
      {...this.panResponder.panHandlers}
      style={this.animatedContainerStyles}>
      {this.props.children}
    </Animated.View>
  )

  render() {
    if (!this.props.visible) return null;

    const { bottom } = this.props.draggableRange;

    return (
      <View style={styles.container} pointerEvents="box-none">
        {this.renderBackdrop()}

        {this.renderContent()}

        {this.props.backdropComponent && (this.props.showBackdrop || this.state.backdropAvailable) &&
          <Animated.View style={[this.animatedContainerStyles, { height: visibleHeight - bottom }]}>
            <ScrollView>
              {this.props.backdropComponent}
            </ScrollView>
          </Animated.View>
        }

        {this.renderCloseButton()}

        {this.props.header && this.renderHeader()}
      </View>
    );
  }
}

SlidingUpPanel.propTypes = {
  visible: PropTypes.bool.isRequired,
  opened: PropTypes.bool.isRequired,
  draggableRange: PropTypes.shape({
    top: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired
  }),
  backdropComponent: PropTypes.element,
  header: PropTypes.element,
  closeButton: PropTypes.element,
  height: PropTypes.number,
  onDrag: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onRequestClose: PropTypes.func,
  allowMomentum: PropTypes.bool,
  allowDragging: PropTypes.bool,
  showBackdrop: PropTypes.bool
};

SlidingUpPanel.defaultProps = {
  visible: false,
  opened: false,
  height: visibleHeight,
  backdropComponent: null,
  header: null,
  closeButton: null,
  draggableRange: { top: visibleHeight, bottom: 0 },
  onDrag: () => {},
  onDragStart: () => {},
  onDragEnd: () => {},
  onRequestClose: () => {},
  allowMomentum: true,
  allowDragging: true,
  showBackdrop: true
};


export default SlidingUpPanel;
