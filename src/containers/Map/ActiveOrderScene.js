import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { cancelOrder } from 'actions/booking';

import { FadeInView, Button } from 'components';

import { strings } from 'locales';
import { ACTIVE_STATUS, ARRIVED_STATUS, COMPLETED_STATUS } from 'utils/orderStatuses';

import FloatButton from './ActiveOrderScene/FloatButton';
import Pointer from './ActiveOrderScene/Pointer';
import OnMyWayModal from './ActiveOrderScene/OnMyWayModal';

import { screenStyles } from './ActiveOrderScene/styles';

class ActiveOrderScene extends Component {
  state = {
    isVisible: false
  };

  get isDriverExist() {
    const { order: { driverDetails } } = this.props;
    return driverDetails && driverDetails.info && !!driverDetails.info.name;
  }

  handleCancelOrder = () => {
    this.props.cancelOrder();
  };

  handleOpenModal = () => {
    this.setState({ isVisible: true });
  };

  handleCloseModal = () => {
    this.setState({ isVisible: false });
  };

  render() {
    const { status, busy } = this.props;

    const isTripActive = status === ACTIVE_STATUS;
    const isDriverArrived = status === ARRIVED_STATUS;
    const isCompletedStatus = status === COMPLETED_STATUS;

    return (
      <View style={screenStyles.container}>
        <FadeInView reverse>
          <View style={screenStyles.headerContainer}>
            <Text style={screenStyles.header}>{strings(`order.statuses.${status}`)}</Text>
            {isCompletedStatus && <Button size="sm"><Text>Create new</Text></Button>}
          </View>
        </FadeInView>

        <View style={screenStyles.separator} />

        <FadeInView>
          <View style={{ paddingBottom: this.isDriverExist ? 140 : 90 }}>
            <View style={screenStyles.actionsRow}>
              {!isTripActive
                ?
                  <FloatButton
                    key="cancel"
                    label="Cancel Order"
                    iconName="cancel"
                    loading={busy}
                    onPress={this.handleCancelOrder}
                  />
                : <FloatButton key="actions" label="Actions" iconName="dots" />
              }

              {isDriverArrived &&
                <FloatButton
                  key="way"
                  label={'I\'m on my way'}
                  iconName="walker"
                  onPress={this.handleOpenModal}
                  style={{ marginLeft: 40 }}
                />
              }
            </View>
          </View>
        </FadeInView>

        <Pointer />

        <OnMyWayModal isVisible={this.state.isVisible} onClose={this.handleCloseModal} />
      </View>
    );
  }
}

ActiveOrderScene.propTypes = {
  cancelOrder: PropTypes.func.isRequired,
  busy: PropTypes.bool
};

ActiveOrderScene.defaultProps = {};

const mapState = ({ bookings }) => ({
  status: bookings.currentOrder.status || 'connected',
  order: bookings.currentOrder,
  busy: bookings.currentOrder.busy
});

const mapDispatch = {
  cancelOrder
};

export default connect(mapState, mapDispatch)(ActiveOrderScene);
