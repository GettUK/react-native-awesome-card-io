import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Input, Icon } from 'components';
import ImagePicker from 'react-native-image-crop-picker';

import { setInitialProfileValues, changeFieldValue, changeAvatar } from 'actions/passenger';
import { prepareInitials } from '../utils';
import styles from './EditProfileStyles';

const avatarPickerConfig = {
  cropping: true,
  width: 300,
  height: 300,
  mediaType: 'photo',
  includeBase64: true,
  //ios only
  smartAlbums: ['UserLibrary', 'PhotoStream'],
  showsSelectedCount: false,
  //android only
  showCropGuidelines: false,
  hideBottomControls: true,
  cropperCircleOverlay: true,
  cropperActiveWidgetColor: '#284784',
  cropperStatusBarColor: '#284784',
  cropperToolbarColor: '#284784',
};

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

  openAvatarPicker = () => {
    ImagePicker.openPicker(avatarPickerConfig).then(image => {
      this.props.handleAvatarChange(`data:${image.mime};base64,${image.data}`);
    });
  };

  render() {
    const {
      firstName,
      lastName,
      avatarUrl,
      avatar,
      handleFirstNameChange,
      handleLastNameChange
    } = this.props;
    return (
      <View style={[styles.flex, styles.container]}>
        <TouchableOpacity activeOpacity={0.6} style={styles.cameraWrapper} onPress={this.openAvatarPicker}>
          <Avatar
            rounded
            xlarge
            source={{ uri: avatar || avatarUrl }}
            title={prepareInitials(this.props)}
            containerStyle={styles.avatar}
          />
          <View style={styles.avatarBackDrop} />
          <Icon style={styles.cameraIcon} size={32} color="#fff" name="camera" />
        </TouchableOpacity>
        <Input
          value={firstName}
          onChangeText={handleFirstNameChange}
          placeholder="First Name"
          inputStyle={styles.input}
          clearIconColor="#d2d0dc"
          clearIconStyle={styles.clearIcon}
          selectionColor="#494949"
        />
        <Input
          value={lastName}
          onChangeText={handleLastNameChange}
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
  lastName: passenger.temp.lastName,
  avatarUrl: passenger.temp.avatarUrl,
  avatar: passenger.temp.avatar
});

const mapDispatch = {
  setInitialProfileValues,
  handleFirstNameChange: changeFieldValue('firstName'),
  handleLastNameChange: changeFieldValue('lastName'),
  handleAvatarChange: changeFieldValue('avatar'),
  changeFieldValue,
  changeAvatar
};

export default connect(mapState, mapDispatch)(EditProfile);
