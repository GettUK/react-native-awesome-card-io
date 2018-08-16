import React, { PureComponent } from 'react';
import { ScrollView, View, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';

class AddressTabBar extends PureComponent {
  renderTab = ({ label, id }) => (
    <TouchableWithoutFeedback onPress={() => this.props.onChangeTab(id)}>
      <View key={id} style={[styles.tabContainer, id === this.props.activeTab && styles.activeTab]}>
        <Text style={[styles.tabLabel, id === this.props.activeTab && { color: this.props.theme.color.primaryText }]}>
          {label.toUpperCase()}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )

  render() {
    const tabs = [
      { label: 'Favorites', id: 'favorites' },
      { label: 'Airports', id: 'airport' },
      { label: 'TrainStations', id: 'trainStation' },
      { label: 'Hotels', id: 'lodging' },
      { label: 'Restaurants', id: 'restaurant' },
      { label: 'Places to visit', id: 'pointOfInterest' }
    ];

    return (
      <View style={styles.tabBarContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={{ marginVertical: 16 }}
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          {tabs.map(this.renderTab)}
        </ScrollView>
      </View>
    );
  }
}

export default AddressTabBar;
