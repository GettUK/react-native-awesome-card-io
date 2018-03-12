import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { cancelOrder } from 'actions/app/booking';

import { Icon } from 'components';
import { FadeInView } from 'components/Animated';

import FloatButton from './ActiveOrderScene/FloatButton';
import Pointer from './ActiveOrderScene/Pointer';
import OnMyWayModal from './ActiveOrderScene/OnMyWayModal';

import { screenStyles } from './ActiveOrderScene/styles';

var MAXIMUM_HEIGHT = 250;
var HANDLER_HEIGHT = 30;
var OFFSET_TOP = 9;

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
  }

  render() {
    return (
      <View style={screenStyles.container}>
        <FadeInView reverse>
          <View style={screenStyles.c}>
            <Text style={screenStyles.header}>Connected...</Text>
          </View>
        </FadeInView>

        <View style={screenStyles.separator} />

        <FadeInView>
          <View style={{ paddingBottom: 100 }}>
            <View style={{ flexDirection: 'row' }}>
              <FloatButton key='cancel' label='Cancel Order' iconName='cancel' onPress={this.handleCancelOrder} />
              <FloatButton key='way' label={`I'm on my way`} iconName='walker' onPress={this.handleOpenModal} style={{ marginLeft: 40 }} />
            </View>
          </View>
        </FadeInView>

        <Pointer />

        <OnMyWayModal isVisible={this.state.isVisible} onClose={this.handleCloseModal} />
      </View>
    );
  }
};

ActiveOrderScene.propTypes = {
  cancelOrder: PropTypes.func.isRequired
};

ActiveOrderScene.defaultProps = {

};

const mapDispatch = {
  cancelOrder
};

export default connect(null, mapDispatch)(ActiveOrderScene);
