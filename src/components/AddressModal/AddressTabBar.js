import React, { PureComponent } from 'react';
import { ScrollView, View, Text, TouchableWithoutFeedback } from 'react-native';

import styles from './styles';

class AddressTabBar extends PureComponent {
  renderTab = ({ label, id }) => (
    <TouchableWithoutFeedback key={id} onPress={() => this.props.onChangeTab(id)}>
      <View
        style={[
          styles.tabContainer,
          { borderBottomColor: this.props.theme.color.bgSearch },
          id === this.props.activeTab && styles.activeTab,
          id === this.props.activeTab && { borderBottomColor: this.props.theme.color.primaryBtns }
        ]}
      >
        <Text style={[styles.tabLabel, id === this.props.activeTab && { color: this.props.theme.color.primaryText }]}>
          {label.toUpperCase()}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    const { tabs } = this.props;

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
