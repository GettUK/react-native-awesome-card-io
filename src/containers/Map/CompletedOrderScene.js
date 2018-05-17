import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FadeInView, Button } from 'components';
import { cancelOrder } from 'actions/booking';

import { strings } from 'locales';
import { CUSTOMER_CARE_STATUS } from 'utils/orderStatuses';

import { screenStyles } from './ActiveOrderScene/styles';
import FloatButton from './ActiveOrderScene/FloatButton';

class CompletedOrderScene extends PureComponent {
  get isDriverExist() {
    const { order: { driverDetails } } = this.props;
    return driverDetails && driverDetails.info && !!driverDetails.info.name;
  }

  handleCancelOrder = () => {
    this.props.cancelOrder();
  };

  renderCancelBtn = () => (
    <FadeInView>
      <View style={{ paddingBottom: this.isDriverExist ? 150 : 90 }}>
        <View style={screenStyles.actionsRow}>
          <FloatButton
            key="cancel"
            label="Cancel Order"
            iconName="cancel"
            loading={this.props.busy}
            onPress={this.handleCancelOrder}
          />
        </View>
      </View>
    </FadeInView>
  );

  render() {
    const { status, goToInitialization } = this.props;

    const isCustomerCareStatus = status === CUSTOMER_CARE_STATUS;

    return (
      <View style={screenStyles.container} pointerEvents="box-none">
        <FadeInView reverse>
          <View style={screenStyles.headerContainer}>
            <Text style={screenStyles.header}>{strings(`order.statuses.${status}`)}</Text>
            {!isCustomerCareStatus &&
              <Button size="sm" styleContent={screenStyles.createNewBtn} onPress={goToInitialization}>
                <Text style={screenStyles.createNewText}>{strings('order.createNew')}</Text>
              </Button>
            }
          </View>
        </FadeInView>

        <View style={screenStyles.separator} />

        {isCustomerCareStatus && this.renderCancelBtn()}
      </View>
    );
  }
}

CompletedOrderScene.propTypes = {
  cancelOrder: PropTypes.func.isRequired,
  goToInitialization: PropTypes.func.isRequired,
  order: PropTypes.object,
  busy: PropTypes.bool
};

CompletedOrderScene.defaultProps = {};

const mapState = ({ booking }) => ({
  status: booking.currentOrder.status || 'connected',
  order: booking.currentOrder,
  busy: booking.currentOrder.busy
});

const mapDispatch = {
  cancelOrder
};

export default connect(mapState, mapDispatch)(CompletedOrderScene);
