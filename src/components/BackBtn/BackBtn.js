import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';

import { Icon } from 'components';

import { strings } from 'locales';
import { throttledAction, showConfirmationAlert } from 'utils';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 17,
    color: '#284784'
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
    const { touchedPath, touched } = this.props;
    if (touchedPath && touched) {
      showConfirmationAlert({ title: strings('goBack'), handler: this.goBack });
    } else {
      this.goBack();
    }
  };

  goBack = throttledAction(() => {
    this.props.navigation.goBack(null);
  });

  render() {
    const { containerStyle, color } = this.props;
    return (
      <TouchableOpacity onPress={this.handlePress} style={[styles.container, containerStyle]}>
        <Icon size={21} name="back" color={color || '#284784'} />
        {Platform.OS === 'ios' && <Text style={[styles.text, color ? { color } : {}]}>{strings('back')}</Text>}
      </TouchableOpacity>
    );
  }
}

const mapState = (state, props) => ({
  touched: !!get(state, props.touchedPath)
});

export default connect(mapState)(BackBtn);
