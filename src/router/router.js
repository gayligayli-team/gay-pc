import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import reducers from './../api/reducers.js'
import store from './../api/store.js'

// Component
import App from "./../App"
import Home from './../view/home'

// User
import Login from './../view/user'
import Register from './../view/register'
import RegisterMail from './../view/registerEmail'





class route extends Component{
	render(){
		return (
			<BrowserRouter basename="/gayligayli">
				<Provider store={store}>
					<App>
						<Switch>

							{/* 用户功能 */}
								{/* 注册 */}
								<Route exact path="/login" component={Login} />
								{/* 邮箱注册 */}
								<Route exact path="/registerMail" component={RegisterMail} />
								{/* 登录 */}
								<Route exact path="/register" component={Register} />
							{/* 视频功能 */}
							<Route path="/" component={Home} />
						</Switch>
					</App>
				</Provider>
			</BrowserRouter>
		)
	}
}

export default route
