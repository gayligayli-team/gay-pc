export const rank = function(state = {
	rankList: {},
}, action){
	const { type, data } = action;
	switch (type){
		case 'LOADING_RANK_LIST':
			return {
				...state,
				rankList: data,
			}

		default:
			return {
				...state,
			}
	}
}

