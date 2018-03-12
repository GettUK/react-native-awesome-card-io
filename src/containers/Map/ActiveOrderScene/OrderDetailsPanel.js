import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import SlidingUpPanel from './SlidingUpPanel';

import { orderPanelStyles } from './styles';

const OrderDetails = ({ onActivate, onClose }) => {
  const height = Dimensions.get('window').height;

  renderListItem = (label) => { // TODO: Get list items from Order creation screen
    return (<View key={label} style={{ padding: 16, paddingVertical: 4 }}>
      <View style={{ width: '100%', borderRadius: 6, height: 60, backgroundColor: 'white' }}>
        <Text>..........{label}</Text>
      </View>
    </View>)
  }

  return (
    <SlidingUpPanel
      visible
      showBackdrop = {false}
      draggableRange = {{
        top: height - 60,
        bottom: 120
      }}
      height = {68}
      backdropComponent={
        <View style={{ paddingBottom: 200 }}>
          {[1,2,3,4,5,6,7].map(renderListItem)}
        </View>
      }
      onActivate = {onActivate}
      onClose = {onClose}
    >
      <View style={orderPanelStyles.activeContainer}>
        <View style={orderPanelStyles.activeItem}>
          <Text>Here is the content inside panel</Text>
        </View>
      </View>
    </SlidingUpPanel>
  );
};

OrderDetails.propTypes = {
  onActivate: PropTypes.func,
  onClose: PropTypes.func
};

OrderDetails.defaultProps = {
  onActivate: () => {},
  onClose: () => {}
};

export default OrderDetails;
