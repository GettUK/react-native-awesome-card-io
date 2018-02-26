import {
  initialState as initialStatuses,
  reducer as reducerStatuses
} from './statuses';
import { initialState as initialMap, reducer as reducerMap } from './map';
import { initialState as initialOrders, default as reducerOrders } from './orders';
import { initialState as initialBooking, default as reducerBooking } from './booking';

export const initialState = {
  statuses: initialStatuses,
  map: initialMap,
  orders: initialOrders,
  booking: initialBooking
};

export const reducer = (state, action) => ({
  statuses: reducerStatuses(state.statuses, action),
  map: reducerMap(state.map, action),
  orders: reducerOrders(state.orders, action),
  booking: reducerBooking(state.booking, action)
});
