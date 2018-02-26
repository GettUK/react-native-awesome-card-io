import { curry } from 'lodash/fp';
import { getPassengerID as getPassengerIDRequest } from 'services/passengers';

export const PASSENGER_VIEW_EMPTY = 'UI/PASSENGER_VIEW/PASSENGER_VIEW_EMPTY';

export const passegerViewEmpty = curry(() => ({
  type: PASSENGER_VIEW_EMPTY
}));

export const RECEIVE_PASSENGER_VIEW_START =
  'UI/PASSENGER_VIEW/RECEIVE_PASSENGER_VIEW_START';

export const receivePassegerViewStart = curry(() => ({
  type: RECEIVE_PASSENGER_VIEW_START
}));

export const RECEIVE_PASSENGER_VIEW_FAILURE =
  'UI/PASSENGER_VIEW/RECEIVE_PASSENGER_VIEW_FAILURE';

export const receivePassegerViewFailure = curry(errors => ({
  type: RECEIVE_PASSENGER_VIEW_FAILURE,
  payload: errors
}));

export const RECEIVE_PASSENGER_VIEW_SUCCESS =
  'UI/PASSENGER_VIEW/RECEIVE_PASSENGER_VIEW_SUCCESS';

export const receivePassegerViewSuccess = curry(results => ({
  type: RECEIVE_PASSENGER_VIEW_SUCCESS,
  payload: results
}));

export const receivePassegerView = () => (dispatch, getState) => {
  const { ui, session } = getState();

  if (ui.passengerView.busy) {
    return Promise.resolve();
  }

  dispatch(receivePassegerViewStart());

  return getPassengerIDRequest(session.token, session.result.member_id)
    .then(result => {
      dispatch(receivePassegerViewSuccess(result));
    })
    .catch(errors => {
      dispatch(receivePassegerViewFailure(errors));
    });
};
