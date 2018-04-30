import React, { PureComponent } from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';

import services from './data';

import styles from './InfoPagesStyles';

class InfoPages extends PureComponent {
  goBack = () => this.props.navigation.goBack();

  renderListItem = (item, disableMarker = false) => (
    <View style={styles.listItemWrapper}>
      {!disableMarker &&
        <View style={styles.listMarker}>
          {item.marker ? this.renderText({ value: item.marker, inner: true }) : <View style={styles.bullet} />}
        </View>
      }

      <View style={styles.listLabelContainer}>
        {item.title &&
          <View style={{ marginBottom: 16 }}>
            {this.renderText({ value: item.title })}
          </View>
        }

        {this.renderItem(item, true)}
      </View>
    </View>
  )

  renderList = (item, inner = false) => (
    <View style={!inner && styles.listWrapper}>
      {item.value.map(listItem => this.renderListItem(listItem, item.disableMarker))}
    </View>
  )

  renderText = ({ type = 'plain', value, inner = false }) => (
    <Text style={[styles[type], inner && { marginBottom: 0 }]} key={value}>{value}</Text>
  )

  renderItem = (item, inner = false) => (
    item.type === 'list'
      ? this.renderList(item, inner)
      : this.renderText(item)
  )

  render() {
    const page = this.props.navigation.state.params.page;

    return (
      <View style={[styles.flex, styles.wrapper]}>
        <StatusBar barStyle="default" />

        <ScrollView>
          {services[page].map(this.renderItem)}
        </ScrollView>
      </View>
    );
  }
}

export default InfoPages;
