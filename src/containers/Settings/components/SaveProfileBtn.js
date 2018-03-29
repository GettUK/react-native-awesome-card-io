import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';
import { sendProfileData } from 'actions/passenger';
import { strings } from 'locales';

class SaveProfileBtn extends Component {
  static propTypes = {
    touched: PropTypes.bool
  };

  handleSave = () => {
    if (this.props.touched) {
      const { sendProfileData, navigation } = this.props;
      sendProfileData()
        .then(() => navigation.goBack(null));
    }
  };

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
  touched: passenger.temp.profileTouched
});

export default connect(mapState, { sendProfileData })(SaveProfileBtn);
