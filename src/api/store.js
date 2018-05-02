import { createStore, combineReducers } from 'redux'

import * as home from './reducers/home'
import * as video from './reducers/video'
import * as rank from './reducers/rank'

let store = createStore(
	combineReducers({
		...home,
		...video,
		...rank,
	}),
);

export default store

