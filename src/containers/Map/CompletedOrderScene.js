import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { initializeOrderCreation } from 'actions/booking';

import { FadeInView, Button } from 'components';

import { strings } from 'locales';

import { screenStyles } from './ActiveOrderScene/styles';

class ActiveOrderScene extends Component {
  state = {
    isVisible: false
  };

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
    const { status, initializeOrderCreation } = this.props;

    return (
      <View style={screenStyles.container}>
        <FadeInView reverse>
          <View style={screenStyles.headerContainer}>
            <Text style={screenStyles.header}>{strings(`order.statuses.${status}`)}</Text>
            <Button size="sm" style={screenStyles.createNewBtn} onPress={initializeOrderCreation}>
              <Text style={screenStyles.createNewText}>{strings('order.createNew')}</Text>
            </Button>
          </View>
        </FadeInView>
      </View>
    );
  }
}

ActiveOrderScene.propTypes = {
  initializeOrderCreation: PropTypes.func.isRequired,
  busy: PropTypes.bool
};

ActiveOrderScene.defaultProps = {};

const mapState = ({ bookings }) => ({
  status: bookings.currentOrder.status || 'connected',
  busy: bookings.currentOrder.busy
});

const mapDispatch = {
  initializeOrderCreation
};

export default connect(mapState, mapDispatch)(ActiveOrderScene);
