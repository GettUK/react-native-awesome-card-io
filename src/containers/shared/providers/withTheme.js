import React from 'react';
import { isEqual } from 'lodash';

import ThemeContext from './ThemeContext';

// This function takes a component...
export default function withTheme(Component) {
  // ...and returns another component...
  return function ThemedComponent(props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well

    return (
      <ThemeContext.Consumer>
        {theme => <ThemeWrapper {...props} theme={{ ...theme }} Component={Component} />}
      </ThemeContext.Consumer>
    );
  };
}

class ThemeWrapper extends React.Component {
  componentDidMount() {
    const { navigation, theme } = this.props;

    if (navigation) {
      navigation.setParams({ theme });
    }
  }

  componentDidUpdate({ theme: oldTheme }) {
    const { navigation, theme } = this.props;

    if (navigation && !isEqual(oldTheme, theme)) {
      navigation.setParams({ theme });
    }
  }

  render() {
    const { Component, innerRef } = this.props;

    return (
      <Component ref={innerRef} {...this.props} />
    );
  }
}
