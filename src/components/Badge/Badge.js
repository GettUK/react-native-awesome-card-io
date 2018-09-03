import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Badge as BadgeElement } from 'react-native-elements';

import { withTheme } from 'providers';

import { color } from 'theme';

import styles from './styles';

class Badge extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    active: PropTypes.bool
  };

  static defaultProps = {
    style: {},
    label: '',
    active: false
  };

  render() {
    const { style, textStyle, theme, label, active, ...rest } = this.props;

    return (
      <BadgeElement
        containerStyle={[styles.badgeContainer, style, active ? { backgroundColor: theme.color.bgOptions } : {}]}
        {...rest}
      >
        {!!label &&
          <Text
            style={[
              styles.badgeText,
              textStyle,
              active ? { color: theme.type === 'dark' ? color.primaryText : color.primaryBtns } : {}
            ]}
          >
            {`${label}`}
          </Text>
        }
      </BadgeElement>
    );
  }
}

export default withTheme(Badge);
