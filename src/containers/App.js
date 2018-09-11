import React, { Component } from 'react';
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

import { shallowEqual, isNightModeTime } from 'utils';

class AppContainer extends Component {
  state = {
    isNightMode: this.props.isNightMode
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.autoThemeMode !== nextProps.autoThemeMode || this.props.isNightMode !== nextProps.isNightMode) {
      this.checkForNightModeImmediate(nextProps);
    }
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
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
    const { autoThemeMode } = this.props;
    if (autoThemeMode) {
      this.checkForNightModeImmediate(this.props);
    }
  }, 20000);

  checkForNightModeImmediate = (props) => {
    const { autoThemeMode, isNightMode } = props;

    if (autoThemeMode) {
      const isNightMode = isNightModeTime();

      if (isNightMode !== this.state.isNightMode) {
        this.setState({ isNightMode });
      }
    } else {
      this.setState({ isNightMode });
    }
  };

  render() {
    const { dispatch, isConnected } = this.props;

    return (
      <ThemeContext.Provider
        value={this.state.isNightMode ? { ...darkTheme, type: 'dark' } : { ...lightTheme, type: 'light' }}
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

const mapState = ({ network, app }) => ({
  isConnected: network.isConnected,
  autoThemeMode: app.theme.autoThemeMode,
  isNightMode: app.theme.isNightMode
});

export default connect(mapState)(AppContainer);
