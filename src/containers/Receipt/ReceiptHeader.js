import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ScreenHeader, Icon } from 'components';
import { TouchableOpacity } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

import styles from './styles';

class ReceiptHeader extends PureComponent {
  downloadReceipt = () => {
    const { receiptPath, navigation } = this.props;
    RNFetchBlob.android.addCompleteDownload({
      title: `Receipt #${navigation.state.params.orderId}.pdf`,
      description: `Download Receipt#${navigation.state.params.orderId}.pdf`,
      mime: 'application/pdf',
      path: receiptPath,
      showNotification: true
    });
  };

  renderDownloadBtn = () => (
    <TouchableOpacity onPress={this.downloadReceipt} style={styles.receiptIcon}>
      <Icon name="receipt" size={20} />
    </TouchableOpacity>
  );

  render() {
    const { navigation } = this.props;
    return (
      <ScreenHeader
        navigation={navigation}
        title={`Receipt #${navigation.state.params.orderId}`}
        rightContent={this.renderDownloadBtn()}
        rightContentStyle={styles.rightContentStyle}
      />
    );
  }
}

const mapState = ({ booking }) => ({
  receiptPath: booking.currentOrder.receiptPath
});

export default connect(mapState)(ReceiptHeader);
