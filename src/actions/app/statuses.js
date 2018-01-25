export const CHANGE_ISREGISTRED = 'APP/STATUSES/CHANGE_ISREGISTRED';

export function changeIsRegistred(value) {
	return {
		type: CHANGE_ISREGISTRED,
		payload: value
	};
}

export const CHANGE_ISOPENKEYBOARD = 'APP/STATUSES/CHANGE_ISOPENKEYBOARD';

export function changeIsOpenKeyboard(value) {
	return {
		type: CHANGE_ISOPENKEYBOARD,
		payload: value
	};
}
