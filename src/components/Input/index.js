import React, { PureComponent } from 'react';
import { TextInput, View, Animated, TouchableOpacity } from 'react-native';
import { Icon } from 'components';
import styles from './style';

export default class Input extends PureComponent {
  labelFontSize = new Animated.Value(18);
  labelTop = new Animated.Value(10);

  static defaultProps = {
    allowClear: true
  };

  componentDidMount() {
    if (this.props.value.length) {
      this.moveLabelUp();
    }
  }

  moveLabelUp() {
    Animated.parallel([
      Animated.spring(this.labelFontSize, {
        toValue: 14,
        duration: 500
      }),
      Animated.spring(this.labelTop, {
        toValue: -10,
        duration: 500
      })
    ]).start();
  }

  handleFocus = () => {
    this.moveLabelUp();
  };

  handleBlur = () => {
    if (!this.props.value) {
      Animated.parallel([
        Animated.spring(this.labelFontSize, {
          toValue: 18,
          duration: 300
        }),
        Animated.spring(this.labelTop, {
          toValue: 10,
          duration: 300
        })
      ]).start();
    }
  };

  handleClear = () => {
    this.props.onChangeText('');
  };

  render() {
    const {
      style,
      inputStyle,
      label,
      labelStyle,
      allowClear,
      error,
      clearIcon,
      iconStyle,
      selectionColor,
      underlineColorAndroid,
      ...rest
    } = this.props;
    const labelStyles = [
      labelStyle,
      styles.label,
      {
        fontSize: this.labelFontSize,
        transform: [{ translateY: this.labelTop }]
      }
    ];

    const inputStyles = [styles.input, inputStyle];
    if (allowClear) inputStyles.push(styles.withClearBtn);
    if (error) inputStyles.push(styles.error);

    return (
      <View style={[styles.container, style]}>
        {label && <Animated.Text style={labelStyles}>{label}</Animated.Text>}
        <TextInput
          {...rest}
          style={inputStyles}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          underlineColorAndroid={underlineColorAndroid || 'transparent'}
          selectionColor={selectionColor || 'rgba(255,255,255,0.2)'}
        />
        {allowClear &&
          rest.value.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.6}
              style={[styles.clearBtn, iconStyle]}
              onPress={this.handleClear}>
              {clearIcon || <Icon name="clear" size={16} color="#fff" />}
            </TouchableOpacity>
          )}
      </View>
    );
  }
}
