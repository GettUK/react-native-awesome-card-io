import React, { Component } from 'react';
import { Keyboard, Platform, View } from 'react-native';

export default class KeyboardHide extends Component {
  state = {
    keyboardUp: false
  }

  componentDidMount() {
    this.keyboardDidShowListener = this.getListener('Show');

    this.keyboardDidHideListener = this.getListener('Hide');
  }


  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  getListener = type => (
    Keyboard.addListener(
      Platform.OS === 'android' ? `keyboardDid${type}` : `keyboardWill${type}`,
      this[`keyboardDid${type}`]
    )
  )

  keyboardDidShow = () => {
    this.setState({ keyboardUp: true });
  }

  keyboardDidHide = () => {
    this.setState({ keyboardUp: false });
  }

  render() {
    return this.state.keyboardUp
      ? <View style={this.props.style || {}} />
      : this.props.children;
  }
}
