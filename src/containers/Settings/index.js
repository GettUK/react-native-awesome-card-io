import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

// import { strings } from 'locales';
import styles from './style';

class Settings extends Component {
  componentDidMount() {}
  render() {
      return <View style={styles.container}>

      </View>;
  }
}

Settings.propTypes = {
  // navigation: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

Settings.defaultProps = {};

const select = ({ ui }) => ({
  ui
});

const bindActions = {};

export default connect(select, bindActions)(Settings);
