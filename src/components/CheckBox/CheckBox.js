import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'components';

class CheckBox extends PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    onPress: PropTypes.func,
    status: PropTypes.bool
  };

  static defaultProps = {
    style: {},
    status: false,
    onPress: () => noop
  };

  render() {
    const { style, status, onPress } = this.props;
    return (
      status
        ? <Icon name="checkOn" size={44} />
        : <TouchableOpacity
          style={style}
          activeOpacity={0.6}
          onPress={onPress}
        >
          <Icon name="checkOff" size={44} />
        </TouchableOpacity>
    );
  }
}
export default CheckBox;
