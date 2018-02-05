import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Platform, Image, View } from 'react-native';
import { has, isNull } from 'lodash/fp';
import styles from './style';

function NavImageButton(props) {
  return (
    <TouchableOpacity
      style={[
        styles.container_button,
        has('styleContainer', props) ? props.styleContainer : {}
      ]}
      onPress={props.onClick ? props.onClick : null}>
      <View
        style={[
          styles.button_view,
          has('styleView', props) ? props.styleView : {}
        ]}>
        <Image
          style={[
            styles.box_image,
            has('styleImage', props) ? props.styleImage : {}
          ]}
          source={has('source', props) ? props.source : null}
          resizeMethod={Platform.OS === 'ios' ? 'auto' : 'resize'}
          resizeMode={
            has('resizeMode', props) && !isNull(props.resizeMode) ?
              props.resizeMode :
              'cover'
          }
        />
      </View>
    </TouchableOpacity>
  );
}

NavImageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  resizeMode: PropTypes.string,
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
  styleImage: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};

NavImageButton.defaultProps = {
  styleContainer: {},
  styleView: {},
  styleImage: {}
};

export default NavImageButton;
