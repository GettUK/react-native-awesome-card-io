import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { clearList } from 'actions/orders';
import { OrdersList } from './components';
import styles from './styles';

function getTitleCount(params) {
  return params ? `(${params.count})` : '';
}

const OrdersTabNavigator = TabNavigator({
    Active: {
      screen: (props) => <OrdersList type="active" {...props} />,
      navigationOptions: ({ navigation }) => ({
        title: `Active ${getTitleCount(navigation.state.params)}`
      })
    },
    Previous: {
      screen: (props) => <OrdersList type="previous" {...props} />,
      navigationOptions: ({ navigation }) => ({
        title: `Previous ${getTitleCount(navigation.state.params)}`
      })
    }
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
        <OrdersTabNavigator />
      </View>
    );
  }
}

const mapDispatch = (dispatch) => ({
  clearList() {
    return clearList(dispatch);
  }
});

export default connect(null, mapDispatch)(Orders);
