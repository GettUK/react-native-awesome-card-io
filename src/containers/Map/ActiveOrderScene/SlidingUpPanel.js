import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
  Platform,
  Dimensions,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import FlickAnimation from './libs/FlickAnimation';
import styles from './libs/styles';

const visibleHeight = Dimensions.get('window').height;

class SlidingUpPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backdropAvailable: this.props.showBackdrop
    }
  }

  componentWillMount() {
    const {top, bottom} = this.props.draggableRange;

    this.animatedValueY = -bottom;
    this.translateYAnimation = new Animated.Value(this.animatedValueY);
    this.flick = new FlickAnimation(this.translateYAnimation, -top, -bottom);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => false
    });

    this.translateYAnimation.addListener(this.onDrag);

    if (this.props.visible) {
      this.transitionTo(-this.props.draggableRange.bottom, () => {}, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { top, bottom } = nextProps.draggableRange;

    if (nextProps.visible && !this.props.visible) {
      this.transitionTo(-this.props.draggableRange.top);
    }

    if (top !== this.props.draggableRange.top || bottom !== this.props.draggableRange.bottom) {
      this.flick = new FlickAnimation(this.translateYAnimation, -top, -bottom);
    }
  }

  componentDidUpdate() {
    const {bottom} = this.props.draggableRange;
    if (this.animatedValueY !== -bottom && !this.props.visible) {
      this.translateYAnimation.setValue(-bottom);
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
    )
  }

  onMoveShouldSetPanResponder = (evt, gestureState) => {
    return (
      this.props.allowDragging &&
      this.isInsideDraggableRange(this.animatedValueY) &&
      Math.abs(gestureState.dy) > 1
    )
  }

  onPanResponderGrant = () => {
    this.flick.stop();
    this.translateYAnimation.setOffset(this.animatedValueY);
    this.translateYAnimation.setValue(0);
    this.props.onDragStart(-this.animatedValueY);
  }

  onPanResponderMove = (evt, gestureState) => {
    if (!this.isInsideDraggableRange(this.animatedValueY)) {
      return;
    }

    this.translateYAnimation.setValue(gestureState.dy);
  }

  onPanResponderRelease = (evt, gestureState) => {
    if (!this.isInsideDraggableRange(this.animatedValueY)) {
      return;
    }

    this.translateYAnimation.flattenOffset();

    const cancelFlick = this.props.onDragEnd(-this.animatedValueY);
    const { bottom, top } = this.props.draggableRange;

    this.transitionTo(this.previousTop === -bottom ? -top : -bottom, () => {});

    if (this.previousTop !== -bottom) {
      this.setState({ backdropAvailable: false });

      this.props.onClose();
    }

    if (!this.props.allowMomentum || cancelFlick) {
      return;
    }

    if (Math.abs(gestureState.vy) > 0.1) {
      this.flick.start({
        velocity: gestureState.vy,
        fromValue: this.animatedValueY
      });
    }

    return
  }

  isInsideDraggableRange = (value) => {
    const { bottom, top } = this.props.draggableRange;

    return value >= -top && value <= -bottom;
  }

  onDrag = ({value}) => {
    if (this.isInsideDraggableRange(value)) {
      this.animatedValueY = value;
      this.props.onDrag(value);
    }

    if (value >= -this.props.draggableRange.bottom) {
      this.props.onRequestClose();
    }
  }

  transitionTo = (value, onAnimationEnd = () => {}) => {
    const animationConfig = {
      toValue: -Math.abs(value),
      duration: 260,
      delay: Platform.OS === 'android' ? 166.67 : 10
    }

    Animated.timing(this.translateYAnimation, animationConfig).start(onAnimationEnd);
  }

  requestClose = () => {
    const { bottom, top } = this.props.draggableRange;

    this.props.onClose();

    this.setState({ backdropAvailable: false });

    this.previousTop = -top;

    if (this.animatedValueY === -bottom) {
      return this.props.onRequestClose();
    }

    return this.transitionTo(-bottom, this.props.onRequestClose)
  }

  get backdropOpacity() {
    const { top, bottom } = this.props.draggableRange;

    return this.translateYAnimation.interpolate({
      inputRange: [-top, -bottom],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });
  }

  renderBackdrop = () => {
    if (!this.props.showBackdrop && !this.state.backdropAvailable) return;

    return (
      <Animated.View style={[styles.backdrop, { opacity: this.backdropOpacity }]} />
    );
  }

  renderCloseButton = () => {
    if (!this.props.showBackdrop && !this.state.backdropAvailable) return;

    return (
      <Animated.View style={[styles.closeButton, { opacity: this.backdropOpacity }]}>
        <TouchableWithoutFeedback onPress={this.requestClose}>
          <View style={{ width: 40, height: 40, backgroundColor: 'red' }} />
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }

  render() {
    if (!this.props.visible) return;

    const { top, bottom } = this.props.draggableRange;
    const height = this.props.height;

    const translateY = this.translateYAnimation.interpolate({
      inputRange: [-top, -bottom],
      outputRange: [-top, -bottom],
      extrapolate: 'clamp'
    });

    const transform = { transform: [{ translateY }] };

    const animatedContainerStyles = [
      styles.animatedContainer,
      this.props.contentStyle,
      transform,
      {height, top: visibleHeight, bottom: -visibleHeight + height}
    ];

    return (
      <View style={styles.container} pointerEvents='box-none'>
        {this.renderBackdrop()}

        <Animated.View
          {...this.panResponder.panHandlers}
          style={animatedContainerStyles}>
          {this.props.children}
        </Animated.View>

        {this.props.backdropComponent && (this.props.showBackdrop || this.state.backdropAvailable) &&
          <Animated.View style={[animatedContainerStyles, { height: visibleHeight - bottom }]}>
            <ScrollView>
              {this.props.backdropComponent}
            </ScrollView>
          </Animated.View>
        }

        {this.renderCloseButton()}
      </View>
    )
  }
}

SlidingUpPanel.propTypes = {
  visible: PropTypes.bool.isRequired,
  draggableRange: PropTypes.shape({
    top: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired
  }),
  backdropComponent: PropTypes.element,
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
  height: visibleHeight,
  backdropComponent: null,
  draggableRange: { top: visibleHeight, bottom: 0 },
  onDrag: () => {},
  onDragStart: () => {},
  onDragEnd: () => {},
  onRequestClose: () => {},
  allowMomentum: true,
  allowDragging: true,
  showBackdrop: true
};


export default SlidingUpPanel
