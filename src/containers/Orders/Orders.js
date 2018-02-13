import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'components';
import { clearList } from 'actions/app/orders';
import { OrdersList } from './components';
import styles from './style';

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
  goBack = () => {
    this.props.navigation.goBack();
  };

  componentWillUnmount() {
    this.props.clearList();
  }

  render() {
    return (
      <View style={styles.flex}>
        <StatusBar translucent barStyle="light-content"/>
        <LinearGradient
          style={styles.header}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['#0076BB', '#284784']}
        >
          <TouchableOpacity onPress={this.goBack}>
            <Icon name="back" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.flex}>
            <Text style={styles.title}>Your Orders</Text>
          </View>
        </LinearGradient>
        <View style={[styles.flex, styles.content]}>
          <OrdersTabNavigator />
        </View>
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
