import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'components';

class CheckBox extends PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    color: PropTypes.string,
    onPress: PropTypes.func,
    status: PropTypes.bool
  };

  static defaultProps = {
    style: {},
    status: false
  };

  renderHandlerIcon = () => {
    const { style, onPress } = this.props;
    return (
      <TouchableOpacity disabled={!onPress} style={style} activeOpacity={0.6} onPress={onPress}>
        <Icon name="checkOff" />
      </TouchableOpacity>
    );
  };

  render() {
    const { status, color } = this.props;
    return (
      status
        ? <Icon name="checkOn" color={color} />
        : this.renderHandlerIcon()
    );
  }
}
export default CheckBox;
