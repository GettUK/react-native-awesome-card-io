import { NAVIGATION_RESET } from 'actions/ui/logout';

import NavigatorApp from 'navigators/navigatorApp';

export const initialState = NavigatorApp.router.getStateForAction(
  NavigatorApp.router.getActionForPathAndParams('MapView')
);

export const reducer = (state, action) => {
  switch (action.type) {
    case NAVIGATION_RESET: {
      return initialState;
    }

    default: {
      return NavigatorApp.router.getStateForAction(action, state);;
    }
  }
}
  
