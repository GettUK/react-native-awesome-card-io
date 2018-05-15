import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import NavigatorRoot from 'navigators/navigatorRoot';

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

  render() {
    return (
      <NavigatorRoot />
    );
  }
}
AppContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(AppContainer);
