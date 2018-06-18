import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { View as AnimatedView } from 'react-native-animatable';

import { Icon } from 'components';
import { passGuide } from 'actions/session';
import { strings } from 'locales';
import { isIphoneX } from 'utils';

import styles from './styles';

const padding = 8;
const { width } = Dimensions.get('window');

const skipAnimation = {
  0: {
    scale: 1
  },
  0.5: {
    scale: 1.15
  },
  1: {
    scale: 1
  }
};

const data = [{
  arrowW: 32,
  arrowH: 47,
  title: strings('userGuide.tapToSet'),
  subTitle: strings('userGuide.yourPickupAndDestination')
}, {
  arrowW: 43,
  arrowH: 44,
  title: strings('userGuide.tapToSee'),
  subTitle: strings('userGuide.allYourOrders')
}, {
  arrowW: 34,
  arrowH: 52,
  title: strings('userGuide.tapToSee'),
  subTitle: strings('userGuide.fullMenu')
}];

class UserGuide extends PureComponent {
  static propsTypes = {
    passGuide: PropTypes.func
  };

  state = {
    step: 0
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        const step = prevState.step + 1;

        if (step > 2) clearInterval(this.interval);

        return { step };
      });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSkip = () => {
    clearInterval(this.interval);
    this.props.passGuide();
  };

  renderHole = (width, height) => (
    <View style={[styles.holeWrapper, { height, width }]} >
      <View
        style={[
          styles.hole,
          {
            height: height + (2 * padding),
            width: width + (2 * padding),
            top: -padding,
            left: -padding
          }
        ]}
      />
    </View>
  );

  renderSideGap = () => <View style={[styles.backdrop, { width: 5 }]} />;

  renderMiddleGap = () => <View style={[styles.backdrop, styles.flex]} />;

  renderStep = ({ arrowW, arrowH, title, subTitle }, index) => (
    <AnimatedView
      key={index}
      useNativeDriver
      animation="fadeInUp"
      style={[styles[`step${index + 1}`], { marginVertical: isIphoneX() ? 20 : 0 }]}
    >
      <Icon name="UGPointer" width={25} height={35} style={styles.pointer} />
      <AnimatedView useNativeDriver animation="fadeIn" delay={750} style={styles[`arrow${index + 1}`]}>
        <Icon name={`UGArrow${index + 1}`} width={arrowW} height={arrowH} />
      </AnimatedView>
      <Text style={styles.hintText}>{title}</Text>
      <Text style={styles.hintText}>{subTitle}</Text>
    </AnimatedView>
  );

  renderSkipBtn = () => (
    <TouchableWithoutFeedback onPress={this.handleSkip}>
      <AnimatedView
        animation={skipAnimation}
        delay={8000}
        iterationCount="infinite"
        useNativeDriver
        style={[styles.skipBtn, { marginBottom: isIphoneX() ? 15 : 0 }]}
      >
        <Text style={styles.skipBtnText}>{strings('userGuide.skip')}</Text>
      </AnimatedView>
    </TouchableWithoutFeedback>
  );

  render() {
    const { step } = this.state;

    return (
      <AnimatedView duration={1500} animation="fadeIn" useNativeDriver style={styles.wrapper}>
        <View style={[styles.backdrop, { height: isIphoneX() ? 40 : 21 }]} />
        <View style={styles.row}>
          {this.renderSideGap()}
          {step > 2 && this.renderHole(50, 60)}
          {this.renderMiddleGap()}
          {step > 1 && this.renderHole(97, 60)}
          {this.renderSideGap()}
        </View>
        {this.renderMiddleGap()}
        <View style={styles.row}>
          {this.renderSideGap()}
          {this.renderHole(width - 10, 95)}
          {this.renderSideGap()}
        </View>
        <View style={[styles.backdrop, { height: isIphoneX() ? 90 : 75 }]} />
        {this.renderSkipBtn()}

        {Array.from(new Array(step)).map((_, i) => this.renderStep(data[i], i))}
      </AnimatedView>
    );
  }
}

export default connect(null, { passGuide })(UserGuide);
