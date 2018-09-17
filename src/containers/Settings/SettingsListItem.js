import React from 'react';
import { ActivityIndicator, TouchableWithoutFeedback, Platform } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import { color } from 'theme';
import StylePropType from 'react-style-proptype';

import { Icon } from 'components';

import { withTheme } from 'providers';

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
    onSwitch,
    badge,
    theme
  } = props;

  const leftIcon = leftIconName
    ? <Icon style={styles.icon} name={leftIconName} size={24} color={color.iconsSettigs} />
    : null;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <ListItem
        leftIcon={isLoading ? <ActivityIndicator color={color.danger} /> : leftIcon}
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
        chevronColor={color.arrowRight}
        badge={badge}

        rightTitle={rightTitle || null}

        switchButton={switchButton}
        hideChevron={!showRightIcon || switchButton}
        switched={switched}
        onSwitch={onSwitch}
        switchOnTintColor={color.success}
        switchThumbTintColor={Platform.OS === 'android' ? '#FFF' : null}
        switchTintColor={Platform.OS === 'android' ? '#DDD' : null}

        rightTitleStyle={[styles.listItemRightTitle, { color: theme.color.secondaryText }]}
        titleStyle={[
          styles.listItemTitle,
          { color: theme.color.primaryText },
          avatar || titleAvatar ? styles.avatarTitle : {},
          titleStyle || {}
        ]}
        containerStyle={[
          styles.listItemContainer,
          { backgroundColor: theme.color.bgPrimary },
          avatar || titleAvatar ? styles.avatarContainer : {}
        ]}
      />
    </TouchableWithoutFeedback>
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
  badge: PropTypes.shape(),
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

export default withTheme(SettingsListItem);
