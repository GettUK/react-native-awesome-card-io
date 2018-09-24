import React, { PureComponent } from 'react';
import { TextInput, View, Animated, TouchableOpacity, Text } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';

import { Icon } from 'components';

import { color } from 'theme';

import { withTheme } from 'providers';

import styles from './style';

const labelFontSizeValues = [18, 14];
const labelTopValues = [10, -10];

class Input extends PureComponent {
  constructor(props) {
    super(props);
    const stateIndex = +!!(props.value || props.placeholder).length;
    this.labelFontSize = new Animated.Value(labelFontSizeValues[stateIndex]);
    this.labelTop = new Animated.Value(labelTopValues[stateIndex]);
  }

  static defaultProps = {
    allowClear: true,
    clearIconColor: color.white,
    allowedError: true,
    placeholder: ''
  };

  componentDidUpdate(prevProps) {
    if ((!prevProps.value.length && !!this.props.value.length)) {
      this.moveLabelUp();
    }
  }

  moveLabelUp() {
    this.labelAnimated({
      toValues: { labelFontSize: labelFontSizeValues[1], labelTop: labelTopValues[1] },
      duration: 500
    });
  }

  handleFocus = () => {
    this.moveLabelUp();
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  labelAnimated = ({ toValues, duration }) => {
    Animated.parallel([
      Animated.spring(this.labelFontSize, {
        toValue: toValues.labelFontSize,
        duration
      }),
      Animated.spring(this.labelTop, {
        toValue: toValues.labelTop,
        duration
      })
    ]).start();
  };

  handleBlur = () => {
    if (!this.props.value && !this.props.placeholder) {
      this.labelAnimated({
        toValues: { labelFontSize: labelFontSizeValues[0], labelTop: labelTopValues[0] },
        duration: 300
      });
    }
  };

  handleClear = () => {
    this.props.onChangeText('');
  };

  renderHelpOption = () => {
    const {
      allowmask,
      allowHelp,
      helpIcon,
      helpIconName,
      helpIconColor,
      helpPress,
      helpIconStyle
    } = this.props;

    return allowmask && allowHelp && (
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.clearBtn, helpIconStyle]}
        onPress={helpPress}
      >
        {helpIcon || <Icon name={helpIconName || 'help'} size={24} color={helpIconColor} />}
      </TouchableOpacity>
    );
  };

  renderClearOption = () => {
    const {
      allowmask,
      allowClear,
      clearIcon,
      clearIconColor,
      clearIconStyle,
      ...rest
    } = this.props;

    return !allowmask && allowClear &&
      rest.value.length > 0 && (
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.clearBtn, clearIconStyle]}
          onPress={this.handleClear}
        >
          {clearIcon || <Icon name="clear" size={16} color={clearIconColor} />}
        </TouchableOpacity>
    );
  };

  renderRightButton = () => {
    const { rightButtonStyle, rightButton } = this.props;

    return (
      <View style={[styles.rightBtn, rightButtonStyle]}>
        {rightButton}
      </View>
    );
  }

  renderError = () => {
    const {
      error,
      allowedError,
      errorStyle
    } = this.props;

    if (!allowedError) return null;

    return error
      ? <Text style={[styles.errorMessage, errorStyle]}>{error[0]}</Text>
      : <View style={styles.errorPlaceholder} />;
  };

  renderLabel = () => {
    const {
      label,
      labelStyle
    } = this.props;

    const labelStyles = [
      styles.label,
      labelStyle,
      {
        fontSize: this.labelFontSize,
        transform: [{ translateY: this.labelTop }]
      }
    ];
    return label && <Animated.Text style={labelStyles}>{label}</Animated.Text>;
  };

  render() {
    const {
      allowmask,
      style,
      inputStyle,
      allowClear,
      allowClearStyle,
      error,
      inputRef,
      rightButton,
      theme,
      ...rest
    } = this.props;

    const inputStyles = [
      styles.input,
      { borderBottomColor: theme.color.pixelLine, color: theme.color.primaryText },
      inputStyle
    ];
    if (allowClear) inputStyles.push(styles.withClearBtn, allowClearStyle);
    if (error) inputStyles.push(styles.error);

    const Input = allowmask ? TextInputMask : TextInput;

    return (
      <View style={[styles.container, style]}>
        {this.renderLabel()}
        <Input
          {...rest}
          ref={inputRef}
          style={inputStyles}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholderTextColor={theme.color.secondaryText}
          underlineColorAndroid="transparent"
          selectionColor="#B5CBF4"
        />
        {rightButton && this.renderRightButton()}
        {this.renderClearOption()}
        {this.renderHelpOption()}
        {this.renderError()}
      </View>
    );
  }
}

export default withTheme(Input);
