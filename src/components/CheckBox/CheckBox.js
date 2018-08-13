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
    const { status } = this.props;
    return (
      status
        ? <Icon name="checkOn" />
        : this.renderHandlerIcon()
    );
  }
}
export default CheckBox;
