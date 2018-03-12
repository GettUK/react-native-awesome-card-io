import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import { Icon, Modal } from 'components';

import { onMyWayStyles } from './styles';

const OnMyWayModal = ({ isVisible, onClose }) => {
  const menuItems = [
    { title: 'Comming in 5 minutes', handler: onClose, chevronHide: true },
    { title: 'Comming in 15 minutes', handler: onClose, chevronHide: true },
    { title: 'Custom message', handler: onClose }
  ]

  renderListItem = ({ title, chevronHide, handler }) => {
    return (
      <TouchableHighlight
        onPress={handler}
        style={onMyWayStyles.listItem}
        underlayColor='rgba(135, 206, 235, 0.3)'
        key={title}
      >
        <View style={onMyWayStyles.listItem}>
          <Text style={onMyWayStyles.listItemTitle}>{title}</Text>
          {!chevronHide && <Icon name='chevron' color='#c6c5cd' width={10} />}
        </View>
      </TouchableHighlight>
    );
  }

  return (
    <Modal
      isVisible={isVisible}
      onModalHide={onClose}
      label='Cancel'
      onClose={onClose}
    >
      {menuItems.map(renderListItem)}
    </Modal>
  );
};

OnMyWayModal.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func
};

OnMyWayModal.defaultProps = {
  isVisible: false,
  onClose: () => {}
};

export default OnMyWayModal;
