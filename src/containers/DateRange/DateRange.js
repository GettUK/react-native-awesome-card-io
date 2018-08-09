import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'components';
import moment from 'moment-timezone';
import { setFilter, clearFilter } from 'actions/orders';

import { strings } from 'locales';

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
    const { orders: { tempMeta } } = this.props;
    return tempMeta.from && tempMeta.to && (
      <View style={[styles.renderView, styles.intervalView]}>
        <Text style={styles.label}>{`${formatLabelDate(tempMeta.from)} - ${formatLabelDate(tempMeta.to)}`}</Text>
      </View>
    );
  };

  renderButton = () => {
    const { orders: { tempMeta } } = this.props;
    return tempMeta.from && tempMeta.to && (
      <View style={[styles.renderView, styles.buttonView]}>
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
    const { orders: { meta } } = this.props;

    return (
      <View style={styles.container}>
        <DateRangePicker
          initialRange={meta.from && meta.to &&
            [meta.from, meta.to]
          }
          onSuccess={this.onRangeSelect}
          futureScrollRange={1}
          scrollEnabled
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

export default connect(mapState, { setFilter, clearFilter })(DateRange);
