import React from 'react';

import { View as AnimatableView } from 'react-native-animatable';

export default class FadeInView extends React.Component {
  static defaultProps = {
    reverse: false,
    value: 20
  }

  render() {
    const { style, reverse, value, children } = this.props;
    return (
      <AnimatableView
        pointerEvents="box-none"
        style={{ ...style, width: '100%' }}
        animation={{ from: { opacity: 0, translateY: reverse ? -value : value }, to: { opacity: 1, translateY: 0 } }}
        duration={600}
        easing="linear"
        useNativeDriver
      >
        {children}
      </AnimatableView>
    );
  }
}
