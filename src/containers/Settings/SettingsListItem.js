import React, { Component } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';

import { Icon } from 'components';

import styles from './style';

export default SettingsListItem = (props) => {
  const { title, rightTitle, leftIconName, avatar, titleAvatar, switchButton, switched, onPress, onSwitch } = props;

  return (
    <ListItem
      onPress={onPress}

      leftIcon={leftIconName ? <Icon name={leftIconName} size={24} color="#8e8e93" /> : null}
      avatar={(avatar || titleAvatar)
        && <Avatar
            rounded
            medium
            source={{ uri: avatar }}
            title={titleAvatar}
          />
      }

      title={title}
      titleNumberOfLines={2}
      chevronColor="#C7C7CC"

      rightTitle={rightTitle || null}

      switchButton={switchButton}
      hideChevron={switchButton}
      switched={switched}
      onSwitch={onSwitch}
      switchOnTintColor="#4CD964"

      rightTitleStyle={styles.listItemRightTitle}
      titleStyle={[
        styles.listItemTitle, 
        avatar || titleAvatar ? styles.avatarTitle : {}
      ]}
      containerStyle={[
        styles.listItemContainer,
        avatar || titleAvatar ? styles.avatarContainer : {}
      ]}
    />
  );
}

SettingsListItem.propTypes = {
  title: PropTypes.string.isRequired,
  rightTitle: PropTypes.string,
  leftIconName: PropTypes.string,
  titleAvatar: PropTypes.string,
  avatar: PropTypes.element,
  switchButton: PropTypes.bool,
  switched: PropTypes.bool,
  onPress: PropTypes.func,
  onSwitch: PropTypes.func,
};

SettingsListItem.defaultProps = {
  rightTitle: null,
  leftIconName: '',
  titleAvatar: null,
  avatar: null,
  switchButton: false,
  switched: false,
  onPress: () => {},
  onSwitch: () => {},
};
