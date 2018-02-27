import { createTypes } from 'redux-compose-reducer';
import { getPassengerID } from 'services/passengers';

const TYPES = createTypes('ui/passengerView',
  ['passegerViewEmpty', 'receivePassegerViewStart', 'receivePassegerViewFailure', 'receivePassegerViewSuccess']);

export const passegerViewEmpty = () => ({ type: TYPES.passegerViewEmpty });

export const receivePassegerViewStart = () => ({ type: TYPES.receivePassegerViewStart });

export const receivePassegerViewFailure = errors => ({ type: TYPES.receivePassegerViewFailure, payload: errors });

export const receivePassegerViewSuccess = results => ({ type: TYPES.receivePassegerViewSuccess, payload: results });

export const receivePassegerView = id => (dispatch, getState) => {
  const { ui, session } = getState();

  if (ui.passengerView.busy) {
    return Promise.resolve();
  }

  dispatch(receivePassegerViewStart());

  return getPassengerID(session.token, id)
    .then(result => {
      dispatch(receivePassegerViewSuccess(result));
    })
    .catch(errors => {
      dispatch(receivePassegerViewFailure(errors));
    });
};
