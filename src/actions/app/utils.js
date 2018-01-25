import { NavigationActions } from 'react-navigation';

export const setParamsChats = key => (dispatch, getState) => {
	const { chats } = getState();
	dispatch(
		NavigationActions.setParams({
			params: { chats },
			key
		})
	);
};
