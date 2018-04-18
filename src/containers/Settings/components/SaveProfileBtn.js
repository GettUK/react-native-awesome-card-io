import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';
import validate from 'validate.js';

import { sendProfileData, setValidationError } from 'actions/passenger';
import { strings } from 'locales';
import { throttledAction } from 'utils';

import { validationRules } from '../utils';

class SaveProfileBtn extends Component {
  static propTypes = {
    touched: PropTypes.bool
  };

  handleSave = throttledAction(() => {
    if (this.props.touched && this.isInputValid()) {
      const { sendProfileData, navigation } = this.props;
      sendProfileData()
        .then(() => navigation.goBack(null));
    }
  });

  isInputValid = () => {
    const { navigation, data } = this.props;

    if (navigation.state.params) {
      const { page, keys } = navigation.state.params;

      let results = null;

      (keys || [page]).forEach((key) => {
        if (key in validationRules) {
          const result = validate(data, { [key]: validationRules[key] });

          if (result) results = { ...results, ...result };
        }
      });

      if (results) this.props.setValidationError(results);

      return !results;
    }

    return true;
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handleSave} style={{ paddingRight: 14 }}>
        <Text style={{ fontSize: 17, color: this.props.touched ? '#284784' : '#bcbbc1' }}>
          {strings('settings.save')}
        </Text>
      </TouchableOpacity>
    );
  }
}

const mapState = ({ passenger }) => ({
  data: passenger.temp,
  touched: passenger.temp.profileTouched
});

export default connect(mapState, { sendProfileData, setValidationError })(SaveProfileBtn);
