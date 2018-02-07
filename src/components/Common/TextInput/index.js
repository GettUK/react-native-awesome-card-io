import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
  View
} from 'react-native';
import { compose, property, has } from 'lodash/fp';
import assets from 'assets';
import styles from './style';

const pTextNativeEvent = compose(property('text'), property('nativeEvent'));

class TextInputItem extends Component {
  focus = () => {
    this.textInput.focus();
  };
  render() {
    return (
      <View
        style={[
          styles.container_textinput,
          has('styleContainer', this.props) ? this.props.styleContainer : {}
        ]}>
        <TextInput
          ref={input => {
            this.textInput = input;
          }}
          style={[
            styles.textInput,
            has('styleInput', this.props) ? this.props.styleInput : {}
          ]}
          placeholder={
            has('placeholder', this.props) ? this.props.placeholder : ''
          }
          keyboardType={
            has('keyboardType', this.props) ? this.props.keyboardType : null
          }
          autoCapitalize={
            has('autoCapitalize', this.props) ? this.props.autoCapitalize : null
          }
          secureTextEntry={
            has('secureTextEntry', this.props) ?
              this.props.secureTextEntry :
              false
          }
          controlled={
            has('controlled', this.props) ? this.props.controlled : null
          }
          defaultValue={this.props.value}
          value={this.props.value}
          underlineColorAndroid="transparent"
          clearButtonMode="while-editing"
          onChange={compose(this.props.onChange, pTextNativeEvent)}
        />
        {has('secureTextEntry', this.props) ? (
          <TouchableOpacity
            style={[styles.container_touch]}
            onPress={compose(this.focus, this.props.onShow)}>
            <Image
              style={[{ width: 20, height: 11 }]}
              source={
                !this.props.secureTextEntry ?
                  assets.eyeIconActive :
                  assets.eyeIcon
              }
              resizeMode="cover"
              resizeMethod={Platform.OS === 'ios' ? 'auto' : 'resize'}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

TextInputItem.propTypes = {
  controlled: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  keyboardType: PropTypes.string,
  placeholder: PropTypes.string,
  onShow: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  styleContainer: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  styleInput: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};

TextInputItem.defaultProps = {
  styleContainer: {},
  styleInput: {}
};

export default TextInputItem;
