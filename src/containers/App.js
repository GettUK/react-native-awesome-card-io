import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash/fp';
import SplashScreen from 'react-native-splash-screen';

import NavigatorApp from 'navigators/navigatorApp';
import NavigatorLogin from 'navigators/navigatorLogin';

import { saveToken } from 'actions/app/pushNotifications';

import PN from 'utils/notifications';

class AppContainer extends Component {
  componentWillMount() {
    PN.getNotificationsPermissions();
    PN.registerFCMToken().then((token) => {
      this.props.dispatch(saveToken(token));
    });
  }

  componentDidMount() {
    setTimeout(SplashScreen.hide, 500); // Avoiding flicker
  }

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
            (isEmpty(token) ? (
              this.loginFlow()
            ) : (
              <NavigatorApp
                navigation={addNavigationHelpers({
                  dispatch: this.props.dispatch,
                  state: this.props.navigatorApp
                })}
                screenProps = {{
                  rootNavigation: NavigatorApp
                }}
              />
            )),
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
