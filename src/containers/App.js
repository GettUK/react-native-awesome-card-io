import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, View } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import NavigatorApp from 'navigators/navigatorApp';
import NavigatorLogin from 'navigators/navigatorLogin';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash/fp';

import { changeKeyboardStatus } from 'actions/app/statuses';

class AppContainer extends Component {
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  keyboardDidShow = () => this.props.dispatch(changeKeyboardStatus(true));
  keyboardDidHide = () => this.props.dispatch(changeKeyboardStatus(false));
  loginFlow = () => (
    <NavigatorLogin
      navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigatorLogin
      })}
    />
  );
  render() {
    const { ui: { auth }, session: { token } } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {auth.errors.cata({
          Nothing: () =>
            isEmpty(token) ? (
              this.loginFlow()
            ) : (
              <NavigatorApp
                navigation={addNavigationHelpers({
                  dispatch: this.props.dispatch,
                  state: this.props.navigatorApp
                })}
              />
            ),
          Just: () => this.loginFlow()
        })}
      </View>
    );
  }
}
AppContainer.propTypes = {
  ui: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  navigatorApp: PropTypes.object.isRequired,
  navigatorLogin: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const select = ({ router, ui, session }) => ({
  ui,
  session,
  navigatorApp: router.navigatorApp,
  navigatorLogin: router.navigatorLogin
});

export default connect(select)(AppContainer);
