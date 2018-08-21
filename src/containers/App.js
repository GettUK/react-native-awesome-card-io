import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import FCM from 'react-native-fcm';
import { throttle } from 'lodash';

import { ConnectionMessage, AlertModal } from 'components';

import NavigatorRoot from 'navigators/navigatorRoot';

import { saveToken } from 'actions/app/pushNotifications';

import { onLayoutConnectBar } from 'actions/app/statuses';

import { darkTheme, lightTheme } from 'theme';

import PN from 'utils/notifications';

import { ThemeContext } from 'providers';

class AppContainer extends PureComponent {
  state = {
    nightMode: false
  }

  componentDidMount() {
    setTimeout(SplashScreen.hide, 1000); // Avoiding flicker

    setTimeout(async () => {
      await PN.getNotificationsPermissions();
      PN.registerFCMToken().then((token) => {
        this.props.dispatch(saveToken(token));
      });

      await FCM.createNotificationChannel({
        id: 'default',
        name: 'default',
        priority: 'normal'
      });
    }, 2000); // After login transition

    this.checkForNightMode();
  }

  componentDidUpdate({ isConnected }) {
    if (isConnected && !this.props.isConnected) {
      this.alert.show();
    } else if (!isConnected && this.props.isConnected) {
      this.alert.hide();
    }
  }

  checkForNightMode = throttle(() => {
    const hour = (new Date()).getHours();
    const nightMode = hour >= 21 || hour < 5;

    if (nightMode !== this.state.nightMode) {
      this.setState({ nightMode });
    }
  }, 20000);

  render() {
    const { dispatch, isConnected } = this.props;

    return (
      <ThemeContext.Provider
        value={this.state.nightMode ? { ...darkTheme, type: 'dark' } : { ...lightTheme, type: 'light' }}
      >
        <View style={{ flex: 1 }}>
          <AlertModal />
          <View style={{ height: isConnected ? 0 : 60 }} />

          <View style={{ flex: 1 }}>
            <NavigatorRoot />
          </View>

          <ConnectionMessage
            onLayout={e => dispatch(onLayoutConnectBar(e))}
            ref={(alert) => { this.alert = alert; }}
            />
        </View>
      </ThemeContext.Provider>
    );
  }
}

AppContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapState = ({ network }) => ({
  isConnected: network.isConnected
});

export default connect(mapState)(AppContainer);
