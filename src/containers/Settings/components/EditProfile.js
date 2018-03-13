import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Input } from 'components';

import { setInitialProfileValues, changeFieldValue } from 'actions/passenger';
import { prepareInitials } from '../utils';
import styles from './EditProfileStyles';

class EditProfile extends Component {
  static propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    setInitialProfileValues: PropTypes.func,
    changeFieldValue: PropTypes.func
  };

  static defaultProps = {
    firstName: '',
    lastName: ''
  };

  componentWillMount() {
    this.props.setInitialProfileValues();
  }

  handleInputChange(field, value) {
    this.props.changeFieldValue(field, value);
  };

  handleFirstNameChange = this.handleInputChange.bind(this, 'firstName');

  handleLastNameChange = this.handleInputChange.bind(this, 'lastName');

  render() {
    const { firstName, lastName } = this.props;
    return (
      <View style={[styles.flex, styles.container]}>
        <Avatar
          rounded
          xlarge
          // source={{ uri: avatar }}
          title={prepareInitials(this.props)}
          containerStyle={styles.avatar}
        />
        <Input
          value={firstName}
          onChangeText={this.handleFirstNameChange}
          placeholder="First Name"
          inputStyle={styles.input}
          clearIconColor="#d2d0dc"
          clearIconStyle={styles.clearIcon}
          selectionColor="#494949"
        />
        <Input
          value={lastName}
          onChangeText={this.handleLastNameChange}
          placeholder="Last Name"
          inputStyle={styles.input}
          clearIconColor="#d2d0dc"
          clearIconStyle={styles.clearIcon}
          selectionColor="#494949"
        />
      </View>
    );
  }
}

const mapState = ({ passenger }) => ({
  firstName: passenger.temp.firstName,
  lastName: passenger.temp.lastName
});

const mapDispatch = {
  setInitialProfileValues,
  changeFieldValue
};

export default connect(mapState, mapDispatch)(EditProfile);
