import { NAVIGATION_RESET } from 'actions/ui/logout';
import NavigatorApp from 'navigators/navigatorApp';

const initialState = NavigatorApp.router.getStateForAction(NavigatorApp.router.getActionForPathAndParams('MapView'));

const reducerNavigatorApp = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATION_RESET: {
      return initialState;
    }

    default: {
      return NavigatorApp.router.getStateForAction(action, state);
    }
  }
};

export default reducerNavigatorApp;
