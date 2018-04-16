import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import reducers from './../api/reducers.js'
import store from './../api/store.js'

// Component
import App from "./../App"
import Home from './../view/home'

// Entrance
import Entrance from './../view/entrance'



class route extends Component{
	render(){
		return (
			<BrowserRouter basename="/gayligayli">
				<Provider store={store}>
					<App>
						<Switch>
							{/* 登录功能 */}
							<Route path="/entrance" component={Entrance} />
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
