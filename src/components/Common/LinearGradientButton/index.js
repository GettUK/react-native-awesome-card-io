import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import { has } from 'lodash/fp';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';

function LinearGradientButton(props) {
  return (
    <View
      style={[
        styles.container_button,
        has('styleContainer', props) ? props.styleContainer : {}
      ]}>
      <TouchableOpacity onPress={props.onClick ? props.onClick : null}>
        <LinearGradient
          start={has('start', props) ? props.start : {}}
          end={has('end', props) ? props.end : {}}
          style={[
            styles.button_gradient,
            has('styleGradient', props) ? props.styleGradient : {}
          ]}
          colors={has('colors', props) ? props.colors : []}>
          <View
            style={[
              styles.button_view,
              has('styleView', props) ? props.styleView : {}
            ]}>
            <Text
              style={[
                styles.button_text,
                has('styleText', props) ? props.styleText : {}
              ]}>
              {props.title ? props.title : null}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

LinearGradientButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  colors: PropTypes.array,
  start: PropTypes.object,
  end: PropTypes.object,
  styleContainer: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  styleView: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  styleText: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  styleGradient: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};

LinearGradientButton.defaultProps = {
  styleContainer: {},
  styleView: {},
  styleText: {},
  styleGradient: {},
  start: { x: 0.0, y: 0.5 },
  end: { x: 1, y: 0.5 },
  colors: ['#F4CF63', '#F4AD52', '#F58D42']
};

export default LinearGradientButton;
