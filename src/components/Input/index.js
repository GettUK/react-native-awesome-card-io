import React, { PureComponent } from 'react';
import { TextInput, View, Animated, TouchableOpacity } from 'react-native';
import { Icon } from 'components';
import styles from './style';

const labelFontSizeValues = [18, 14];
const labelTopValues = [10, -10];

export default class Input extends PureComponent {
  constructor(props) {
    super(props);
    this.labelFontSize = new Animated.Value(labelFontSizeValues[+!!props.value.length]);
    this.labelTop = new Animated.Value(labelTopValues[+!!props.value.length]);
  }

  static defaultProps = {
    allowClear: true,
    clearIconColor: '#fff'
  };

  componentWillReceiveProps(nextProps) {
    if(!this.props.value.length && !!nextProps.value.length) {
      this.moveLabelUp();
    }
  }

  moveLabelUp() {
    Animated.parallel([
      Animated.spring(this.labelFontSize, {
        toValue: labelFontSizeValues[1],
        duration: 500
      }),
      Animated.spring(this.labelTop, {
        toValue: labelTopValues[1],
        duration: 500
      })
    ]).start();
  }

  handleFocus = () => {
    this.moveLabelUp();
    if(this.props.onFocus) {
      this.props.onFocus();
    }
  };

  handleBlur = () => {
    if (!this.props.value) {
      Animated.parallel([
        Animated.spring(this.labelFontSize, {
          toValue: labelFontSizeValues[0],
          duration: 300
        }),
        Animated.spring(this.labelTop, {
          toValue: labelTopValues[0],
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
      clearIconColor,
      clearIconStyle,
      selectionColor,
      underlineColorAndroid,
      inputRef,
      ...rest
    } = this.props;

    const labelStyles = [
      styles.label,
      labelStyle,
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
          ref={inputRef}
          style={inputStyles}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          underlineColorAndroid={underlineColorAndroid || 'transparent'}
          selectionColor={selectionColor || 'rgba(255, 255, 255, 0.2)'}
        />
        {allowClear &&
          rest.value.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.6}
              style={[styles.clearBtn, clearIconStyle]}
              onPress={this.handleClear}>
              {clearIcon || <Icon name="clear" size={16} color={clearIconColor} />}
            </TouchableOpacity>
          )}
      </View>
    );
  }
}
