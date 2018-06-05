import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, TouchableOpacity, BackHandler } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Input, Icon, KeyboardHide } from 'components';
import ImagePicker from 'react-native-image-crop-picker';

import { strings } from 'locales';

import { showConfirmationAlert } from 'utils';

import { setInitialProfileValues, changeProfileFieldValue, touchField } from 'actions/passenger';

import styles from './EditProfileStyles';

const avatarPickerConfig = {
  cropping: true,
  width: 300,
  height: 300,
  mediaType: 'photo',
  includeBase64: true,
  // ios only
  smartAlbums: ['UserLibrary', 'PhotoStream'],
  showsSelectedCount: false,
  // android only
  showCropGuidelines: false,
  hideBottomControls: true,
  cropperCircleOverlay: true,
  cropperActiveWidgetColor: '#284784',
  cropperStatusBarColor: '#284784',
  cropperToolbarColor: '#284784'
};

class EditProfile extends Component {
  static propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    setInitialProfileValues: PropTypes.func,
    changeProfileFieldValue: PropTypes.func
  };

  static defaultProps = {
    firstName: '',
    lastName: ''
  };

  componentDidMount() {
    this.props.setInitialProfileValues();

    this.backListener = BackHandler.addEventListener('backPress', () => {
      const { touched } = this.props;

      if (touched) {
        showConfirmationAlert({ title: strings('goBack'), handler: this.goBack });
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

  openAvatarPicker = () => {
    ImagePicker.openPicker(avatarPickerConfig).then((image) => {
      this.props.handleAvatarChange(`data:${image.mime};base64,${image.data}`);
    });
  };

  renderInput = ({ item, label, onChangeText }) => {
    const { error } = this.props;

    return (
      <Input
        key={item}
        value={this.props[item]}
        error={error && error[item]}
        onChangeText={onChangeText}
        placeholder={label}
        style={styles.inputContainer}
        inputStyle={styles.input}
        allowClearStyle={styles.allowClearStyle}
        clearIconColor="#d2d0dc"
        clearIconStyle={styles.clearIcon}
        selectionColor="#494949"
        maxLength={30}
      />
    );
  };

  onChangeInput = (type = 'First', value) => {
    this.props[`handle${type}NameChange`](value.trim());
  }

  render() {
    const { avatarUrl, avatar } = this.props;

    const inputs = [
      { item: 'firstName', label: 'First Name', onChangeText: value => this.onChangeInput('First', value) },
      { item: 'lastName', label: 'Last Name', onChangeText: value => this.onChangeInput('Last', value) }
    ];

    const userAvatar = avatar || avatarUrl;

    return (
      <View style={[styles.flex, styles.container]}>
        <KeyboardHide style={styles.cameraWrapper}>
          <TouchableOpacity activeOpacity={0.6} style={styles.cameraWrapper} onPress={this.openAvatarPicker}>
            <Avatar
              rounded
              xlarge
              source={userAvatar && { uri: userAvatar }}
              containerStyle={styles.avatar}
            />
            <View style={styles.avatarBackDrop} />
            <Icon style={styles.cameraIcon} size={32} color="#fff" name="camera" />
          </TouchableOpacity>
        </KeyboardHide>

        {inputs.map(this.renderInput)}
      </View>
    );
  }
}

const mapState = ({ passenger }) => ({
  firstName: passenger.temp.firstName,
  lastName: passenger.temp.lastName,
  avatarUrl: passenger.temp.avatarUrl,
  avatar: passenger.temp.avatar,
  touched: passenger.temp.profileTouched,
  error: passenger.temp.validationError
});

const mapDispatch = {
  setInitialProfileValues,
  handleFirstNameChange: changeProfileFieldValue('firstName'),
  handleLastNameChange: changeProfileFieldValue('lastName'),
  handleAvatarChange: changeProfileFieldValue('avatar'),
  touchField
};

export default connect(mapState, mapDispatch)(EditProfile);
