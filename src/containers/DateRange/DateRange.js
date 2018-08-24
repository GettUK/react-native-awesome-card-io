import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import moment from 'moment-timezone';

import { setFilter, clearFilter } from 'actions/orders';

import { Button } from 'components';

import { strings } from 'locales';

import { withTheme } from 'providers';

import DateRangePicker from './DateRangePicker';

import styles from './styles';

const formatLabelDate = date => moment(date).format('D MMM YYYY');

class DateRange extends Component {
  componentDidMount() {
    const { orders: { meta }, setFilter } = this.props;
    if (meta.from && meta.to) {
      setFilter('tempMeta', { from: meta.from, to: meta.to });
    }
  }

  onRangeSelect = (from, to) => {
    this.props.setFilter('tempMeta', { from, to });
  };

  onSaveDateRange = () => {
    const { orders: { tempMeta }, setFilter, clearFilter, navigation } = this.props;
    if (tempMeta.from && tempMeta.to) {
      setFilter('meta', { from: tempMeta.from, to: tempMeta.to });
      clearFilter('tempMeta', 'dateRange');
      navigation.goBack();
    }
  };

  renderInterval = () => {
    const { orders: { tempMeta }, theme } = this.props;

    return tempMeta.from && tempMeta.to && (
      <View style={[styles.renderView, styles.intervalView, { backgroundColor: theme.color.bgSecondary }]}>
        <Text style={[styles.label, { color: theme.color.primaryText }]}>
          {`${formatLabelDate(tempMeta.from)} - ${formatLabelDate(tempMeta.to)}`}
        </Text>
      </View>
    );
  };

  renderButton = () => {
    const { orders: { tempMeta }, theme } = this.props;

    return tempMeta.from && tempMeta.to && (
      <View style={[styles.renderView, styles.buttonView, { backgroundColor: theme.color.bgPrimary }]}>
        <Button
          style={styles.saveBtn}
          styleContent={[styles.saveBtnView]}
          onPress={this.onSaveDateRange}
        >
          <Text style={[styles.saveBtnText]}>{strings('order.button.save')}</Text>
        </Button>
      </View>
    );
  };

  render() {
    const { orders: { meta }, theme } = this.props;

    const calendarTheme = {
      calendarBackground: theme.color.bgSecondary,
      dayTextColor: theme.color.primaryText,
      markColor: theme.color.iconsSettigs,
      markTextColor: theme.color.white,
      todayTextColor: theme.color.bgStatuses,
      monthTextColor: theme.color.primaryText
    };

    return (
      <View style={[styles.container, { backgroundColor: theme.color.bgSecondary }]}>
        <DateRangePicker
          initialRange={meta.from && meta.to &&
            [meta.from, meta.to]
          }
          onSuccess={this.onRangeSelect}
          futureScrollRange={240}
          scrollEnabled
          style={{ backgroundColor: theme.color.bgSecondary }}
          theme={calendarTheme}
        />
        {this.renderInterval()}
        {this.renderButton()}
      </View>
    );
  }
}

const mapState = ({ orders }) => ({
  orders
});

export default connect(mapState, { setFilter, clearFilter })(withTheme(DateRange));
