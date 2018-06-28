import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Pdf from 'react-native-pdf';

import styles from './styles';
import { getReceiptUrl } from './utils';

class Receipt extends PureComponent {
  render() {
    const { navigation, token } = this.props;
    const source = {
      uri: getReceiptUrl(navigation.state.params.orderId),
      cache: true,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return (
      <Pdf
        fitWidth
        source={source}
        style={styles.pdf}
      />

    );
  }
}

const mapState = ({ session }) => ({
  token: session.token
});

export default connect(mapState)(Receipt);
