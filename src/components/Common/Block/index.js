import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { isArray, isString, map, has } from 'lodash/fp';
import { ternaryOp } from 'utils';
import styles from './style';

function Block(props) {
  return (
    <View
      style={[
        styles.container_button,
        has('styleContainer', props) ? props.styleContainer : {}
      ]}>
      <View
        style={[styles.view, has('styleView', props) ? props.styleView : {}]}>
        {ternaryOp(
          has('data', props),
          ternaryOp(
            isArray(props.data),
            map(
              item => (
                <Text key={item} style={[styles.text]}>
                  {item}
                </Text>
              ),
              props.data
            ),
            ternaryOp(
              isString(props.data),
              <Text style={[styles.text]}>{props.data}</Text>,
              null
            )
          ),
          null
        )}
      </View>
    </View>
  );
}

Block.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.array
  ]),
  styleContainer: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  styleView: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};

Block.defaultProps = {
  styleContainer: {},
  styleView: {}
};

export default Block;
