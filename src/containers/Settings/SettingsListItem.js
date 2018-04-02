import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import StylePropType from 'react-style-proptype';

import { Icon } from 'components';

import styles from './style';

const SettingsListItem = (props) => {
  const {
    title,
    rightTitle,
    leftIconName,
    avatar,
    titleAvatar,
    showRightIcon,
    switchButton,
    titleStyle,
    switched,
    isLoading,
    onPress,
    onSwitch
  } = props;

  const leftIcon = leftIconName ? <Icon style={styles.icon} name={leftIconName} size={24} color="#8e8e93" /> : null;

  return (
    <ListItem
      onPress={onPress}

      leftIcon={isLoading ? <ActivityIndicator color="#fd6c5a" /> : leftIcon}
      avatar={(avatar || !!titleAvatar) && (
        <Avatar
          rounded
          medium
          source={avatar && { uri: avatar }}
          title={titleAvatar}
          containerStyle={styles.avatar}
        />)
      }

      title={title}
      titleNumberOfLines={2}
      chevronColor="#C7C7CC"

      rightTitle={rightTitle || null}

      switchButton={switchButton}
      hideChevron={!showRightIcon || switchButton}
      switched={switched}
      onSwitch={onSwitch}
      switchOnTintColor="#4CD964"

      rightTitleStyle={styles.listItemRightTitle}
      titleStyle={[
        styles.listItemTitle,
        avatar || titleAvatar ? styles.avatarTitle : {},
        titleStyle || {}
      ]}
      containerStyle={[
        styles.listItemContainer,
        avatar || titleAvatar ? styles.avatarContainer : {}
      ]}
    />
  );
};

SettingsListItem.propTypes = {
  title: PropTypes.string.isRequired,
  rightTitle: PropTypes.string,
  leftIconName: PropTypes.string,
  titleAvatar: PropTypes.string,
  avatar: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  showRightIcon: PropTypes.bool,
  switchButton: PropTypes.bool,
  switched: PropTypes.bool,
  titleStyle: StylePropType,
  onPress: PropTypes.func,
  onSwitch: PropTypes.func
};

SettingsListItem.defaultProps = {
  rightTitle: null,
  leftIconName: '',
  titleAvatar: null,
  avatar: null,
  showRightIcon: true,
  switchButton: false,
  switched: false,
  titleStyle: {},
  onPress: () => {},
  onSwitch: () => {}
};

export default SettingsListItem;
