import {
	createStore,
	combineReducers,
} from 'redux'

import * as home from './reducers/home'
import * as video from './reducers/video'

let store = createStore(
	combineReducers({
		...home,
		...video
	}),
);

export default store

