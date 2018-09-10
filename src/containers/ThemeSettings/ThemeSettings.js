import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Icon, CheckBox, ListView, Divider } from 'components';

import { changeTheme } from 'actions/app/theme';

import { strings } from 'locales';

import { withTheme } from 'providers';

import { isNightModeTime } from 'utils';

import styles from './style';

class ThemeSettings extends PureComponent {
  handleOpenInfo = value => this.props.handleOnThemeModalInfo(value);

  handleOnChange = (value) => {
    const { onClose, changeTheme } = this.props;
    onClose();
    setTimeout(() => {
      if (value === 'auto') {
        changeTheme({
          autoThemeMode: true,
          isNightMode: isNightModeTime()
        });
      } else if (value === 'day') {
        changeTheme({
          autoThemeMode: false,
          isNightMode: false
        });
      } else if (value === 'night') {
        changeTheme({
          autoThemeMode: false,
          isNightMode: true
        });
      }
    }, 350); // for smooth animation
  };

  keyExtractor = (value, index) => `${index}`;

  renderItem = ({ item, index }) => {
    const { autoThemeMode, isNightMode, theme: { color } } = this.props;
    let isSelected;
    switch (item) {
      case 'auto':
        isSelected = autoThemeMode;
        break;
      case 'day':
        isSelected = !autoThemeMode && !isNightMode;
        break;
      case 'night':
        isSelected = !autoThemeMode && isNightMode;
        break;
      default:
        isSelected = false;
    }

    return (
      <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => this.handleOnChange(item)}>
        <View style={styles.commonContainer}>
          <View style={styles.checkboxWrapper}>
            <CheckBox status={isSelected} color={color.iconsSettigs} />
          </View>
          <View style={styles.lineView}>
            <View style={styles.viewItem}>
              <Text style={[styles.label, { color: color.primaryText }]}>{strings(`settings.label.${item}`)}</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => this.handleOpenInfo(item)}>
              <View style={styles.button}>
                <Icon name="vehicleInfo" color={color.secondaryText} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => <Divider left={7} style={styles.dividerStyle} />;

  render() {
    return (
      <ListView
        typeSections={false}
        items={['auto', 'day', 'night']}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapState = ({ app }) => ({
  autoThemeMode: app.theme.autoThemeMode,
  isNightMode: app.theme.isNightMode
});

const mapDispatch = ({
  changeTheme
});

export default connect(mapState, mapDispatch)(withTheme(ThemeSettings));
