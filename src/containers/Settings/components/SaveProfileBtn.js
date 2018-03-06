import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';
import { sendProfileData } from 'actions/passenger';
import { strings } from 'locales';

class SaveProfileBtn extends Component {
  static propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    tempFirstName: PropTypes.string,
    tempLastName: PropTypes.string,
    sendProfileData: PropTypes.func
  };

  get isChanged() {
    const { firstName, lastName, tempFirstName, tempLastName, tempAvatar} = this.props;
    return firstName !== tempFirstName || lastName !== tempLastName || !!tempAvatar;
  }

  handleSave = () => {
    if (this.isChanged) {
      const { sendProfileData, navigation } = this.props;
      sendProfileData()
        .then(() => navigation.goBack(null))
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handleSave} style={{ paddingRight: 14 }}>
        <Text style={{ fontSize: 17, color: this.isChanged ? '#284784' : '#bcbbc1' }}>
          {strings('settings.save')}
        </Text>
      </TouchableOpacity>
    );
  }
}

const mapState = ({ passenger }) => ({
  firstName: passenger.data.firstName,
  lastName: passenger.data.lastName,
  tempFirstName: passenger.temp.firstName,
  tempLastName: passenger.temp.lastName,
  tempAvatar: passenger.temp.avatar
});

export default connect(mapState, { sendProfileData })(SaveProfileBtn);
