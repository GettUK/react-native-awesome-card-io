import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { StyleSheet, Text, TouchableOpacity, Platform, Keyboard } from 'react-native';

import { Icon } from 'components';

import { strings } from 'locales';

import { withTheme } from 'providers';

import { throttledAction, showConfirmationAlert } from 'utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8
  },
  text: {
    fontSize: 17
  }
});

class BackBtn extends Component {
  static propTypes = {
    field: PropTypes.string,
    touched: PropTypes.bool,
    touchedPath: PropTypes.string,
    navigation: PropTypes.object,
    containerStyle: Text.propTypes.style,
    color: PropTypes.string
  };

  handlePress = () => {
    if (this.props.handlePress) {
      this.props.handlePress();
      return;
    }
    Keyboard.dismiss();

    const { touchedPath, touched, theme } = this.props;
    if (touchedPath && touched) {
      showConfirmationAlert({ theme, title: strings('alert.title.goBack'), handler: this.goBack });
    } else {
      this.goBack();
    }
  };

  goBack = throttledAction(() => {
    const { backAction, navigation } = this.props;
    if (backAction) { backAction(); }
    navigation.goBack(null);
  });

  render() {
    const { containerStyle, theme, color: Color } = this.props;
    const { color } = theme;

    return (
      <TouchableOpacity onPress={this.handlePress} style={[styles.container, containerStyle]}>
        <Icon size={21} name="back" color={Color || color.primaryBtns} />
        {Platform.OS === 'ios' &&
          <Text style={[styles.text, Color ? { color: Color } : { color: color.primaryBtns }]}>
            {strings('header.button.back')}
          </Text>
        }
      </TouchableOpacity>
    );
  }
}

const mapState = (state, props) => ({
  touched: !!get(state, props.touchedPath)
});

export default connect(mapState)(withTheme(BackBtn));
