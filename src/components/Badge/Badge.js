import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Badge as BadgeElement } from 'react-native-elements';
import styles from './styles';

export default class Badge extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    label: PropTypes.string,
    active: PropTypes.bool
  };

  static defaultProps = {
    style: {},
    label: '',
    active: false
  };

  render() {
    const { style, label, active, ...rest } = this.props;

    return (
      <BadgeElement
        containerStyle={[styles.badgeContainer, style, active ? styles.activeContainer : {}]}
        {...rest}
      >
        {label &&
          <Text style={[styles.badgeText, active ? styles.activeText : {}]}>
            {label}
          </Text>
        }
      </BadgeElement>
    );
  }
}
