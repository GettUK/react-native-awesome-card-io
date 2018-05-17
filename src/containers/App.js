import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { ConnectionMessage } from 'components';

import NavigatorRoot from 'navigators/navigatorRoot';

import { saveToken } from 'actions/app/pushNotifications';

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
    const connectionMargin = isIphoneX() ? -40 : -20;

    return <View style={{ flex: 1 }}>
      <ConnectionMessage ref={(alert) => { this.alert = alert; }} />
      <View style={{ flex: 1, marginTop: !this.props.isConnected ? connectionMargin : 0 }}>
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
