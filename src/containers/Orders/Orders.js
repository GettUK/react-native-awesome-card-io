import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { Answers } from 'react-native-fabric';

import { GradientWrapper } from 'components';

import { OrdersList } from './components';

import styles from './styles';

function renderTab(route, isActive, theme, onPress) {
  return <TouchableWithoutFeedback key={route.routeName} onPress={onPress}>
    <View style={[
        styles.tab,
        { borderColor: isActive ? theme.color.ordersTabs : 'transparent' }
      ]}
    >
      <Text style={[styles.tabLabel, { opacity: isActive ? 1 : 0.6 }]}>
        {`${route.routeName.toUpperCase()}\n(${route.params.count || 0})`}
      </Text>
    </View>
  </TouchableWithoutFeedback>;
}

function renderTabBar({ navigationState, navigation }) {
  const { theme } = navigationState.params;
  const Wrapper = theme.type === 'dark' ? View : GradientWrapper;

  return (
    <Wrapper style={[styles.gradient, { backgroundColor: theme.color.bgPrimary }]}>
      {navigationState.routes.map((route, index) =>
        renderTab(route, index === navigationState.index, theme, () => {
          Answers.logContentView(`${route.routeName} tab was opened`, 'tab view', `${route.routeName}TabOpen`);
          navigation.navigate(route.routeName);
          navigationState.params.onChangeTab(route.routeName);
        }))
      }
    </Wrapper>
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
