import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { color, formattedColor } from 'theme';

import { rateDriver } from 'actions/booking';
import { SaveBtn } from 'components';
import { throttledAction } from 'utils';
import { strings } from 'locales';

function SaveRatingBtn({ rating, rateDriver, navigation, rateable = true }) {
  const handleSave = throttledAction(() => {
    if (rating) {
      rateDriver()
        .then(() => navigation.goBack(null));
    }
  });

  return (rateable
    ? <SaveBtn
        defaultColor={formattedColor.white.opacity(0.5)}
        enabledColor={color.white}
        title={strings('header.button.send')}
        onPress={handleSave}
        enabled={!!rating}
    />
    : null
  );
}

SaveRatingBtn.propTypes = {
  rating: PropTypes.number
};

const mapState = ({ booking }) => ({
  rating: booking.currentOrder.tempDriverRating,
  rateable: booking.currentOrder.rateable
});

export default connect(mapState, { rateDriver })(SaveRatingBtn);
