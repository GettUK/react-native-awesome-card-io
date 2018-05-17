import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { rateDriver } from 'actions/booking';
import { SaveBtn } from 'components';
import { throttledAction } from 'utils';

function SaveRatingBtn({ rating, rateDriver, navigation, rateable = true }) {
  const handleSave = throttledAction(() => {
    if (rating) {
      rateDriver()
        .then(() => navigation.goBack(null));
    }
  });

  return (rateable ? <SaveBtn onPress={handleSave} enabled={!!rating} /> : null);
}

SaveRatingBtn.propTypes = {
  rating: PropTypes.number
};

const mapState = ({ booking }) => ({
  rating: booking.currentOrder.tempDriverRating,
  rateable: booking.currentOrder.rateable
});

export default connect(mapState, { rateDriver })(SaveRatingBtn);
