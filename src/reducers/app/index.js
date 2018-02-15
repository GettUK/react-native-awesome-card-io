import {
  initialState as initialStatuses,
  reducer as reducerStatuses
} from './statuses';
import { initialState as initialMap, reducer as reducerMap } from './map';
import { initialState as initialOrders, default as reducerOrders } from './orders';

export const initialState = {
  statuses: initialStatuses,
  map: initialMap,
  orders: initialOrders
};

export const reducer = (state, action) => ({
  statuses: reducerStatuses(state.statuses, action),
  map: reducerMap(state.map, action),
  orders: reducerOrders(state.orders, action)
});
