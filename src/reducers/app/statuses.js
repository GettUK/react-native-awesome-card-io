import { CHANGE_ISOPENKEYBOARD } from 'actions/app/statuses';

export const initialState = {
	isOpenKeyboard: false
};

export function reducer(state, action) {
	switch (action.type) {
		case CHANGE_ISOPENKEYBOARD: {
			return {
				...state,
				isOpenKeyboard: action.payload
			};
		}
		default: {
			return state;
		}
	}
}
