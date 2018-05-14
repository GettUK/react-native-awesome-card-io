import { Component } from 'react';
import { connect } from 'react-redux';

import { auth } from 'actions/ui/auth';

class AuthLoading extends Component {
  componentWillMount() {
    const { session: { token }, auth, navigation } = this.props;

    if (token) {
      auth();
    } else {
      navigation.navigate('Login');
    }
  }

  componentWillReceiveProps({ authBusy, authErrors }) {
    const { authBusy: authBusyProp, navigation } = this.props;

    if (!authBusy && authBusyProp && !authErrors) {
      navigation.navigate('App');
    } else if (!authBusy && authBusyProp && authErrors) {
      navigation.navigate('Login');
    }
  }

  render() {
    return null;
  }
}

const mapState = ({ session, ui }) => ({
  session,
  authBusy: ui.auth.busy,
  authErrors: ui.auth.errors
});

const mapDispatch = ({
  auth
});

export default connect(mapState, mapDispatch)(AuthLoading);
