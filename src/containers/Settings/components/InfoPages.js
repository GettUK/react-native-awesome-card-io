import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, WebView, ActivityIndicator } from 'react-native';

const pages = {
  privacy: 'https://gett.com/uk/legal/privacy/',
  terms: 'https://gett.com/uk/legal/terms/',
  contactUs: 'https://gett.com/uk/contact/'
};

export default class InfoPages extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object
  };

  renderLoading = () => (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#284784" />
      </View>
  );

  render() {
    return (
      <WebView
        startInLoadingState
        source={{ uri: pages[this.props.navigation.state.params.page] }}
        renderLoading={this.renderLoading}
      />
    );
  }
}
