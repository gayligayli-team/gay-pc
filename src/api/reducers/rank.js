export const rank = function(state = {
	rankingList: [],
}, action){
	const { type, data } = action;
	switch (type){
		case 'UPDATE_RANKING':
			return {
				...state,
				rankingList: data,
			}

		default:
			return {
				...state,
			}
	}
}

