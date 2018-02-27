import { createTypes } from 'redux-compose-reducer';
import { geocode } from 'services/passengers';

const TYPES = createTypes('ui/geocode',
  ['geocodeEmpty', 'receiveGeocodeStart', 'receiveGeocodeFailure', 'receiveGeocodeSuccess']);

export const geocodeEmpty = () => ({ type: TYPES.geocodeEmpty });

export const receiveGeocodeStart = () => ({ type: TYPES.receiveGeocodeStart });

export const receiveGeocodeFailure = errors => ({ type: TYPES.receiveGeocodeFailure, payload: errors });

export const receiveGeocodeSuccess = results => ({ type: TYPES.receiveGeocodeSuccess, payload: results });

export const receiveGeocode = fields => (dispatch, getState) => {
  const { ui, session } = getState();
  if (ui.geocode.busy) {
    return Promise.resolve();
  }

  dispatch(receiveGeocodeStart());

  return geocode(session.token, fields)
    .then(result => {
      dispatch(receiveGeocodeSuccess(result));
      return result;
    })
    .catch(errors => {
      dispatch(receiveGeocodeFailure(errors));
      return errors;
    });
};
