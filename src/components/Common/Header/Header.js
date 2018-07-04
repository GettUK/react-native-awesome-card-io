import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './style';

class Header extends React.Component {
  renderTitle = () => {
    const { title, customStylesTitle, onPressTitle, titleCenter } = this.props;

    return (
      <Text
        style={[styles.headerTitle, titleCenter && styles.headerTitleCenter, customStylesTitle]}
        onPress={onPressTitle}>
        {title}
      </Text>
    );
  }

  render() {
    const { leftButton, rightButton, customStyles } = this.props;

    return (
      <View style={[styles.headerWrap, customStyles]} pointerEvents="box-none">
        <View style={styles.header} pointerEvents="box-none">
          {leftButton && <View>{leftButton}</View>}

          {this.renderTitle()}

          {rightButton &&
            <View>
              {typeof rightButton === 'string'
                ? <Text style={styles.rightHeaderButton}>{rightButton}</Text>
                : rightButton
              }
            </View>
          }
        </View>
      </View>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  onPressTitle: PropTypes.func,
  titleCenter: PropTypes.bool,
  customStyles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  customStylesTitle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  leftButton: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  rightButton: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ])
};

Header.defaultProps = {};

export default Header;
