import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { Answers } from 'react-native-fabric';

import { GradientWrapper } from 'components';
import { color } from 'theme';

import { OrdersList } from './components';

import styles from './styles';

function renderTab(route, index, isActive, onPress) {
  return <TouchableWithoutFeedback key={route.routeName} onPress={onPress}>
    <View style={[
        styles.tab,
        { borderColor: isActive ? color.ordersTabs : 'transparent' }
      ]}
    >
      <Text style={[styles.tabLabel, { opacity: isActive ? 1 : 0.6 }]}>
        {`${route.routeName.toUpperCase()}\n(${route.params.count || 0})`}
      </Text>
    </View>
  </TouchableWithoutFeedback>;
}

function renderTabBar({ navigationState, navigation }) {
  return (
    <GradientWrapper style={styles.gradient}>
      {navigationState.routes.map((route, index) =>
        renderTab(route, index, index === navigationState.index, () => {
          Answers.logContentView(`${route.routeName} tab was opened`, 'tab view', `${route.routeName}TabOpen`);
          navigation.navigate(route.routeName);
          navigationState.params.onChangeTab(route.routeName);
        }))
      }
    </GradientWrapper>
  );
}

export default createMaterialTopTabNavigator(
  {
    Personal: { screen: props => <OrdersList idsType="include" {...props} /> },
    Business: { screen: props => <OrdersList idsType="exclude" {...props} /> },
    Previous: { screen: props => <OrdersList type="previous" {...props} /> }
  },
  {
    tabBarComponent: renderTabBar,
    backBehavior: 'none'
  }
);
