import React, { PureComponent } from 'react';
import { View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { ConnectionMessage } from 'components';

import NavigatorRoot from 'navigators/navigatorRoot';

import { saveToken } from 'actions/app/pushNotifications';

import { onLayoutConnectBar } from 'actions/app/statuses';

import { isIphoneX } from 'utils';
import PN from 'utils/notifications';

class AppContainer extends PureComponent {
  componentDidMount() {
    PN.getNotificationsPermissions();
    PN.registerFCMToken().then((token) => {
      this.props.dispatch(saveToken(token));
    });

    setTimeout(SplashScreen.hide, 500); // Avoiding flicker
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
    const connectionMargin = isIphoneX() || Platform.OS === 'android' ? -40 : -20;

    return <View style={{ flex: 1 }}>
      <ConnectionMessage
        onLayout={e => dispatch(onLayoutConnectBar(e))}
        ref={(alert) => { this.alert = alert; }}
      />
      <View style={{ flex: 1, marginTop: !isConnected ? connectionMargin : 0 }}>
        <NavigatorRoot />
      </View>
    </View>;
  }
}

AppContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapState = ({ network }) => ({
  isConnected: network.isConnected
});

export default connect(mapState)(AppContainer);
