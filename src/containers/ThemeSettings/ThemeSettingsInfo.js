import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import { strings } from 'locales';

import { withTheme } from 'providers';

import styles from './style';

class ThemeSettingsInfo extends PureComponent {
  render() {
    const { chosenThemeInfo, theme } = this.props;
    if (!chosenThemeInfo) {
      return null;
    }
    return (
      <View style={styles.themeInfoWrapper}>
        <Text style={[styles.themeInfoTitle, { color: theme.color.primaryText }]}>
          {strings(`settings.themeTitle.${chosenThemeInfo}`)}
        </Text>
        <Text style={styles.themeInfoText}>
          {strings(`settings.themeText.${chosenThemeInfo}`)}
        </Text>
      </View>
    );
  }
}

export default withTheme(ThemeSettingsInfo);
