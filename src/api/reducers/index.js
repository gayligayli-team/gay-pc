export default function reducers(state = {

}, action){
	// const list = state.menuList;
	switch (action.type){
		case 'UPDATE_VIDEO_INFO':
			return {
				...action.data
			}
		default:
			return {
				...state,
			}
	}
}