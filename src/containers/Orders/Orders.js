import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { clearList } from 'actions/orders';
import { OrdersList } from './components';
import styles from './styles';

function getTitleCount(params, type) {
  return params && params.count ? `(${params.count[type] || '0'})` : '';
}

function getScreenParams({ type, idsType, title }) {
  return {
    screen: props => <OrdersList type={type} idsType={idsType} {...props} />,
    navigationOptions: ({ navigation }) => ({
      title: `${title} ${getTitleCount(navigation.state.params, type)}`
    })
  };
}

const OrdersTabNavigator = TabNavigator(
  {
    Personal: getScreenParams({ idsType: 'include', title: 'Personal' }),
    Business: getScreenParams({ idsType: 'exclude', title: 'Business' }),
    Previous: getScreenParams({ type: 'previous', title: 'Previous' })
  },
  {
    ...TabNavigator.Presets.AndroidTopTabs,
    tabBarOptions: {
      style: {
        backgroundColor: 'transparent'
      },
      indicatorStyle: {
        backgroundColor: '#7ae4ff'
      },
      labelStyle: { fontSize: 12 },
      inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
      pressColor: 'rgba(255, 255, 255, 0.4)',
      pressOpacity: 0.8
    }
  }
);

class Orders extends Component {
  componentWillMount() {
    this.props.clearList();
  }

  render() {
    return (
      <View style={[styles.flex, styles.content]}>
        <OrdersTabNavigator screenProps={{ rootNavigation: this.props.navigation }} />
      </View>
    );
  }
}

const mapDispatch = dispatch => ({
  clearList() {
    return clearList(dispatch);
  }
});

export default connect(null, mapDispatch)(Orders);
