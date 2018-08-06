import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { color } from 'theme';

import { clearFilter } from 'actions/orders';
import { SaveBtn } from 'components';

import { strings } from 'locales';
import { throttledAction } from 'utils';

import DateRangePicker from './DateRangePicker';

const ClearBtn = ({ orders: { tempMeta, meta }, clearFilter }) => {
  const handleClear = throttledAction(() => {
    if (meta.from && meta.to) {
      clearFilter('meta', 'dateRange');
    }
    clearFilter('tempMeta', 'dateRange');
    DateRangePicker.clear();
  });

  return (
    <SaveBtn
      title={strings('header.button.clear')}
      onPress={handleClear}
      enabled={(!!(tempMeta.from && tempMeta.to)) || false}
      enabledColor={color.white}
      style={{ paddingRight: 0 }}
    />
  );
};

ClearBtn.propTypes = {
  navigation: PropTypes.object,
  clearFilter: PropTypes.func,
  ordersParams: PropTypes.object
};

const mapState = ({ orders }) => ({
  orders
});

export default connect(mapState, { clearFilter })(ClearBtn);
