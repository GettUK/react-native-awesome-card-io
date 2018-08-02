import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, BackHandler } from 'react-native';
import { color } from 'theme';
import { Input } from 'components';

import { strings } from 'locales';

import { showConfirmationAlert } from 'utils';

import { setInitialProfileValues, changeProfileFieldValue, touchField } from 'actions/passenger';
import styles from './EditProfileStyles';

class SingleInputEditor extends Component {
  static propTypes = {
    changeProfileFieldValue: PropTypes.func
  };

  static defaultProps = {
    input: ''
  };

  componentDidMount() {
    this.props.setInitialProfileValues();

    this.backListener = BackHandler.addEventListener('backPress', () => {
      const { touched } = this.props;

      if (touched) {
        showConfirmationAlert({ title: strings('alert.title.goBack'), handler: this.goBack });
        return true;
      }

      this.goBack();
      return true;
    });
  }

  componentWillUnmount() {
    this.props.touchField('profile', false);

    this.backListener.remove();

    BackHandler.removeEventListener('backPress');
  }

  goBack = () => this.props.navigation.goBack(null);

  render() {
    const {
      data,
      navigation,
      error,
      changeProfileFieldValue
    } = this.props;

    const { key, label } = navigation.state.params;
    const keys = ['phone', 'mobile'];
    let additionalProps = {};

    if (keys.includes(key)) {
      additionalProps = {
        keyboardType: 'phone-pad',
        allowmask: true,
        mask: '[000000000099999]'
      };
    }

    return (
      <View style={[styles.flex, styles.container, { paddingTop: 24 }]}>
        <Input
          value={data}
          error={error && error[key]}
          label={label}
          style={styles.inputContainer}
          allowClearStyle={styles.allowClearStyle}
          labelStyle={styles.labelStyle}
          onChangeText={changeProfileFieldValue.bind(null, key)}
          inputStyle={styles.input}
          clearIconColor={color.arrowRight}
          clearIconStyle={styles.clearIcon}
          {...additionalProps}
        />
      </View>
    );
  }
}

const mapState = ({ passenger }, props) => ({
  data: passenger.temp[props.navigation.state.params.key] || '',
  touched: passenger.temp.profileTouched,
  error: passenger.temp.validationError
});

const mapDispatch = {
  setInitialProfileValues,
  changeProfileFieldValue,
  touchField
};

export default connect(mapState, mapDispatch)(SingleInputEditor);
