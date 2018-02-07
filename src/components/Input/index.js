import React, { PureComponent } from 'react';
import {
  TextInput,
  Image,
  View,
  Animated,
  TouchableOpacity
} from 'react-native';
import assets from 'assets';
import styles from './style';

class Input extends PureComponent {
  static defaultProps = {
    allowClear: true
  };
  labelFontSize = new Animated.Value(18);
  labelTop = new Animated.Value(10);
  handleFocus = () => {
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
          underlineColorAndroid="transparent"
          selectionColor="rgba(255,255,255,0.2)"
        />
        {allowClear && (
          <TouchableOpacity style={styles.clearBtn} onPress={this.handleClear}>
            <Image style={styles.clearIcon} source={assets.clear} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default Input;
