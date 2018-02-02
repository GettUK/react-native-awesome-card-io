import {
  initialState as initialStatuses,
  reducer as reducerStatuses
} from './statuses';
import { initialState as initialMap, reducer as reducerMap } from './map';

export const initialState = {
  statuses: initialStatuses,
  map: initialMap
};

export const reducer = (state, action) => ({
  statuses: reducerStatuses(state.statuses, action),
  map: reducerMap(state.map, action)
});
