import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { saveReceiptPath } from 'actions/booking';
import Pdf from 'react-native-pdf';

import styles from './styles';
import { getReceiptUrl } from './utils';

class Receipt extends PureComponent {
  savePath = (_, path) => {
    this.props.saveReceiptPath(path);
  };

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
        onLoadComplete={this.savePath}
        style={styles.pdf}
      />

    );
  }
}

const mapState = ({ session }) => ({
  token: session.token
});

const mapDispatch = ({
  saveReceiptPath
});

export default connect(mapState, mapDispatch)(Receipt);
