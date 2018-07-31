import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';

export default class Loader extends PureComponent {
  static defaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1200,

    animating: true,
    interaction: true,

    count: 1
  };

  static propTypes = {
    animationEasing: PropTypes.func,
    animationDuration: PropTypes.number,

    animating: PropTypes.bool,
    interaction: PropTypes.bool,

    renderComponent: PropTypes.func,
    count: PropTypes.number
  };

  state = {
    progress: new Animated.Value(0)
  };

  mounted = false;

  startAnimation = ({ finished } = {}) => {
    const { progress } = this.state;
    const {
      interaction,
      animationEasing,
      animationDuration
    } = this.props;

    if (!this.mounted || finished === false) {
      return;
    }

    const animation =
      Animated.timing(progress, {
        duration: animationDuration,
        easing: animationEasing,
        useNativeDriver: true,
        isInteraction: interaction,
        toValue: 1
      });

    progress.setValue(0);
    animation.start(this.startAnimation);

    this.setState({ animation });
  };

  stopAnimation = () => {
    const { animation } = this.state;

    if (animation == null) {
      return;
    }

    animation.stop();

    this.setState({ animation: null });
  };

  componentDidMount() {
    const { animating } = this.props;

    this.mounted = true;

    if (animating) {
      this.startAnimation();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate({ animating }) {
    if (animating !== this.props.animating) {
      if (animating) {
        this.stopAnimation();
      } else {
        this.startAnimation();
      }
    }
  }

  renderComponent = (_, index) => {
    const { progress } = this.state;
    const { renderComponent, count } = this.props;

    if (typeof renderComponent === 'function') {
      return renderComponent({ index, count, progress });
    }
    return null;
  };

  render() {
    const { count, ...props } = this.props;

    return (
      <Animated.View {...props}>
        {Array.from(new Array(count), this.renderComponent)}
      </Animated.View>
    );
  }
}
