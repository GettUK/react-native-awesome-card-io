import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, TouchableOpacity, BackHandler } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Input, Icon, KeyboardHide } from 'components';
import ImagePicker from 'react-native-image-crop-picker';
import { color } from 'theme';

import { strings } from 'locales';

import { showConfirmationAlert } from 'utils';

import { withTheme } from 'providers';

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
  cropperActiveWidgetColor: color.primaryBtns,
  cropperStatusBarColor: color.primaryBtns,
  cropperToolbarColor: color.primaryBtns
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
      const { touched, theme } = this.props;

      if (touched) {
        showConfirmationAlert({ theme, title: strings('alert.title.goBack'), handler: this.goBack });
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
        onBlur={() => onChangeText((this.props[item] || '').trim())}
        inputStyle={styles.input}
        allowClearStyle={styles.allowClearStyle}
        clearIconColor={color.arrowRight}
        clearIconStyle={styles.clearIcon}
        maxLength={30}
      />
    );
  };

  render() {
    const { avatarUrl, avatar, theme, handleFirstNameChange, handleLastNameChange } = this.props;

    const inputs = [
      { item: 'firstName', label: 'First Name', onChangeText: handleFirstNameChange },
      { item: 'lastName', label: 'Last Name', onChangeText: handleLastNameChange }
    ];

    const userAvatar = avatar || avatarUrl;

    return (
      <View style={[styles.flex, styles.container, { backgroundColor: theme.color.bgPrimary }]}>
        <KeyboardHide style={styles.cameraWrapper}>
          <TouchableOpacity activeOpacity={0.6} style={styles.cameraWrapper} onPress={this.openAvatarPicker}>
            <Avatar
              rounded
              xlarge
              source={userAvatar && { uri: userAvatar }}
              containerStyle={styles.avatar}
            />
            <View style={styles.avatarBackDrop} />
            <Icon style={styles.cameraIcon} size={32} color={color.white} name="camera" />
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

export default connect(mapState, mapDispatch)(withTheme(EditProfile));
