const reducer = function(state = {
	videoDetail: {},
}, action){
	const { type, data } = action;
	switch (type){
		case 'LOADING_VIDEO_INFO':
			return {
				...state,
				videoDetail: data,
			}

		default:
			return {
				...state,
			}
	}
}
export default reducer