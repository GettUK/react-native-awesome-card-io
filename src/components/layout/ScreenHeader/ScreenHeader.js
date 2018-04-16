import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'components/index';
import styles from './styles';

const gradientColors = ['#0076bb', '#284784'];
const gradientStart = { x: 0, y: 1 };
const gradientEnd = { x: 1, y: 0 };
const backIconSize = 20;
const backIconColor = '#fff';
const backBtnOpacity = 0.6;

export default function ScreenHeader(props) {
  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={props.headerContainerStyle}>
      <StatusBar translucent barStyle="light-content" />
      <LinearGradient
        style={[styles.header, props.headerStyle]}
        start={gradientStart}
        end={gradientEnd}
        colors={gradientColors}
      >
        <TouchableOpacity activeOpacity={backBtnOpacity} onPress={props.onBackPress || goBack} style={styles.backBtn}>
          <Icon style={styles.backIcon} name="back" size={backIconSize} color={backIconColor} />
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
        <View style={styles.flex}>
          <Text style={styles.text}>{props.title}</Text>
        </View>
        {props.rightContent &&
          <View style={styles.rightContent}>{props.rightContent}</View>
        }
      </LinearGradient>
    </View>
  );
}

ScreenHeader.propTypes = {
  headerContainerStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  headerStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  navigation: PropTypes.object,
  title: PropTypes.string,
  rightContent: PropTypes.node
};
