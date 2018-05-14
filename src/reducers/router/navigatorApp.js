import NavigatorApp from 'navigators/navigatorApp';

const initialState = NavigatorApp.router.getStateForAction(NavigatorApp.router.getActionForPathAndParams('MapView'));

const reducerNavigatorApp = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return NavigatorApp.router.getStateForAction(action, state);
    }
  }
};

export default reducerNavigatorApp;
