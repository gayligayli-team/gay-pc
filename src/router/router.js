import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import reducers from './../api/reducers.js'
import store from './../api/store.js'

// Component
import App from "./../App"
import Home from './../view/home'
import Other from './../view/other'


// Entrance
import Entrance from './../view/entrance'

// store.subscribe(() => {
//   console.log('store发生了变化');
// });


class route extends Component{
	render(){
		return (
			<BrowserRouter basename="/gayligayli">
				<Provider store={store}>
					<App>
						<Switch>
							{/* 登录功能 */}
							<Route path="/entrance" component={Entrance} />
							{/* 番剧分类 */}
							<Route path="/bangumi" component={Other} />
							{/* 核心功能 */}
							<Route path="/" component={Home} />
						</Switch>
					</App>
				</Provider>
			</BrowserRouter>
		)
	}
}

export default route
