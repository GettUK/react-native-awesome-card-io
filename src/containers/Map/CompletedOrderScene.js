import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { clearCurrentOrder } from 'actions/booking';

import { FadeInView, Button } from 'components';

import { strings } from 'locales';

import { screenStyles } from './ActiveOrderScene/styles';

class CompletedOrderScene extends PureComponent {
  render() {
    const { status, clearCurrentOrder } = this.props;

    return (
      <View style={screenStyles.container}>
        <FadeInView reverse>
          <View style={screenStyles.headerContainer}>
            <Text style={screenStyles.header}>{strings(`order.statuses.${status}`)}</Text>
            <Button size="sm" style={screenStyles.createNewBtn} onPress={clearCurrentOrder}>
              <Text style={screenStyles.createNewText}>{strings('order.createNew')}</Text>
            </Button>
          </View>
        </FadeInView>
      </View>
    );
  }
}

CompletedOrderScene.propTypes = {
  clearCurrentOrder: PropTypes.func.isRequired,
  busy: PropTypes.bool
};

CompletedOrderScene.defaultProps = {};

const mapState = ({ bookings }) => ({
  status: bookings.currentOrder.status || 'connected',
  busy: bookings.currentOrder.busy
});

const mapDispatch = {
  clearCurrentOrder
};

export default connect(mapState, mapDispatch)(CompletedOrderScene);
