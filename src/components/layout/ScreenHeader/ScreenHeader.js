import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';

import { Icon, GradientWrapper } from 'components';

import { withTheme } from 'providers';

import { color } from 'theme';

import styles from './styles';

const backIconSize = 20;
const backIconColor = color.white;
const backBtnOpacity = 0.6;

function ScreenHeader(props) {
  const goBack = () => {
    if (props.handleBackBtnPress) {
      return props.handleBackBtnPress();
    }
    return props.navigation.goBack();
  };

  const renderBackBtn = () => (
    <TouchableOpacity activeOpacity={backBtnOpacity} onPress={props.onBackPress || goBack} style={styles.backBtn}>
      <Icon style={styles.backIcon} name="back" size={backIconSize} color={backIconColor} />
      <Text style={styles.text}>Back</Text>
    </TouchableOpacity>
  );

  const Wrapper = props.theme.type === 'dark' ? View : GradientWrapper;

  return (
    <View style={props.headerContainerStyle}>
      <StatusBar translucent barStyle="light-content" />
      <Wrapper style={[styles.header, props.headerStyle, { backgroundColor: props.theme.color.bgPrimary }]}>
        {props.leftContent ? props.leftContent : renderBackBtn()}
        <Text numberOfLines={1} style={[styles.flex, styles.text, styles.title]}>{props.title}</Text>
        {props.rightContent
          ? <View style={[styles.rightContent, props.rightContentStyle]}>{props.rightContent}</View>
          : <View style={styles.placeholder} />
        }
      </Wrapper>
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
  rightContent: PropTypes.node,
  handleBackBtnPress: PropTypes.func
};

export default withTheme(ScreenHeader);
