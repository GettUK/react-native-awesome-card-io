import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getCurrentUser } from 'actions/session';

class AuthLoading extends PureComponent {
  componentDidMount() {
    const { session: { token }, getCurrentUser, navigation } = this.props;

    if (token) {
      getCurrentUser()
        .then(() => navigation.navigate('App'))
        .catch(() => navigation.navigate('Login'));
    } else {
      navigation.navigate('Login');
    }
  }

  render() {
    return null;
  }
}

const mapState = ({ session }) => ({
  session
});

const mapDispatch = ({
  getCurrentUser
});

export default connect(mapState, mapDispatch)(AuthLoading);
