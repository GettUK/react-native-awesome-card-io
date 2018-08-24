import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Dimensions } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';

import { setFilter, clearFilter } from 'actions/orders';

import { ScreenHeader, IconBtn, RoundedBar } from 'components';

import { strings } from 'locales';

import { withTheme } from 'providers';

import { formattedColor } from 'theme';

import styles from './styles';

export const { width } = Dimensions.get('window');

class HeaderSearch extends Component {
  state = {
    showFilters: false,
    animationHeader: {
      width: width / 3
    },
    animationIcon: {
      opacity: 0
    }
  };

  onChangeText = (e) => {
    this.props.setFilter('meta.search', e);
  };

  toggleFilters = (bool, fn) => {
    this.setState({ showFilters: bool || false }, fn);
  };

  animate = ({ isHide }) => {
    const opacity = isHide ? 0 : 1;
    const nWidth = isHide ? width / 3 : width;

    this.setState({ animationHeader: { width: nWidth }, animationIcon: { opacity } });
  };

  closeFiltersLayout = () => {
    const { delay, clearFilter } = this.props;

    this.animate({ isHide: true });
    setTimeout(this.toggleFilters, delay);
    clearFilter('meta');
  };

  openFiltersLayout = () => this.toggleFilters(true, () => this.animate({ isHide: false }));

  goToDateRange = () => this.props.navigation.navigate('DateRange');

  renderAnimation = ({ style, duration, transition, children }) => (
    <AnimatableView
      duration={duration}
      transition={transition}
      style={style}
    >
      {children}
    </AnimatableView>
  );

  renderLayer = () => {
    const { showFilters, animationHeader, animationIcon } = this.state;
    const { meta, delay } = this.props;
    const isActiveFilter = meta.from && meta.to;

    return (showFilters && (
      this.renderAnimation({
        style: [styles.search, animationHeader],
        duration: delay,
        transition: ['width'],
        children: (
          <Fragment>
            {this.renderAnimation({
              style: animationIcon,
              duration: delay * 2,
              transition: ['opacity'],
              children: <IconBtn style={styles.iconLeftBtn} onPress={this.closeFiltersLayout} name="close"/>
            })}
            <RoundedBar
              containerStyle={styles.searchBarContainer}
              inputStyle={styles.searchBarInput}
              iconStyle={styles.searchBarIcon}
              onChangeText={this.onChangeText}
              value={meta.search || ''}
              placeholder={strings('header.title.search')}
              labelColor={formattedColor.white.opacity(0.6)}
              underlineColorAndroid="transparent"
            />
            {this.renderAnimation({
              style: animationIcon,
              duration: delay * 2,
              transition: ['opacity'],
              children: (
                <IconBtn style={styles.iconRightBtn} onPress={this.goToDateRange} name="calendarRange"/>
              )
            })}
            {showFilters && isActiveFilter && <View style={styles.activeCalendarFilter}/>}
          </Fragment>
        )
      })
    ));
  };

  hanlderBackPress = () => {
    const { navigation, theme } = this.props;

    navigation.goBack();

    if (navigation.state.params && navigation.state.params.fromSettings) {
      navigation.navigate('Settings', {
        theme,
        onGoToRides: navigation.state.params.onGoToRides,
        onGoToNotifications: navigation.state.params.onGoToNotifications
      });
    }
  };

  renderHeader = () => {
    const { showFilters } = this.state;
    const { navigation } = this.props;

    return (
      <ScreenHeader
        navigation={navigation}
        title={!showFilters ? 'Your Orders' : ''}
        leftContent={showFilters && <View style={styles.leftPlaceholder}/>}
        rightContent={!showFilters &&
          <IconBtn
            style={styles.iconRightBtn}
            onPress={this.openFiltersLayout}
            strokeWidth="1.5"
            size={20}
            name="search"
          />
        }
        headerContainerStyle={styles.headerContainer}
        onBackPress={this.hanlderBackPress}
      />
    );
  };

  render() {
    return (
      <View>
        {this.renderHeader()}
        {this.renderLayer()}
      </View>
    );
  }
}

HeaderSearch.propTypes = {
  navigation: PropTypes.object,
  meta: PropTypes.object,
  setFilter: PropTypes.func,
  clearFilter: PropTypes.func
};

HeaderSearch.defaultProps = {
  delay: 500
};

const mapState = ({ orders }) => ({
  meta: orders.meta
});

export default connect(mapState, { setFilter, clearFilter })(withTheme(HeaderSearch));
