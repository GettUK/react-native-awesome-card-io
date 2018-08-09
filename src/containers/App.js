import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import FCM from 'react-native-fcm';

import { ConnectionMessage, AlertModal } from 'components';

import NavigatorRoot from 'navigators/navigatorRoot';

import { saveToken } from 'actions/app/pushNotifications';

import { onLayoutConnectBar } from 'actions/app/statuses';

import PN from 'utils/notifications';

class AppContainer extends PureComponent {
  componentDidMount() {
    setTimeout(SplashScreen.hide, 1000); // Avoiding flicker

    setTimeout(async () => {
      await PN.getNotificationsPermissions();
      PN.registerFCMToken().then((token) => {
        this.props.dispatch(saveToken(token));
      });

      await FCM.createNotificationChannel({
        id: 'root_channel_2',
        name: 'root_channel_2',
        priority: 'max'
      });
    }, 2000); // After login transition
  }

  componentDidUpdate({ isConnected }) {
    if (isConnected && !this.props.isConnected) {
      this.alert.show();
    } else if (!isConnected && this.props.isConnected) {
      this.alert.hide();
    }
  }

  render() {
    const { dispatch, isConnected } = this.props;

    return (
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
