import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';

import { Icon } from 'components';

import { strings } from 'locales';
import { throttledAction } from 'utils';


import { showConfirmationAlert } from 'utils';

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
    navigation: PropTypes.object
  };

  handlePress = () => {
    const { field, touched } = this.props;
    if (field && touched) {
      showConfirmationAlert({ title: strings('goBack'), handler: this.goBack });
    } else {
      this.goBack();
    }
  };

  goBack = throttledAction(() => {
    this.props.navigation.goBack(null);
  });

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress} style={styles.container}>
        <Icon size={21} name="back" color="#284784" />
        {Platform.OS === 'ios' && <Text style={styles.text}>{strings('back')}</Text>}
      </TouchableOpacity>
    );
  }
}

const mapState = ({ passenger }, props) => ({
  touched: passenger.temp[`${props.field}Touched`]
});

export default connect(mapState)(BackBtn);
