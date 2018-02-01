import {
  initialState as initialStatuses,
  reducer as reducerStatuses
} from './statuses';

export const initialState = {
  statuses: initialStatuses
};

export function reducer(state, action) {
  const nextStatuses = reducerStatuses(state.statuses, action);

  if (state.statuses === nextStatuses) {
    return state;
  }

  return {
    statuses: nextStatuses
  };
}
