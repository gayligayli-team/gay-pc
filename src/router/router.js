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
import Login from './../view/login'
import Register from './../view/register'
import RegisterMail from './../view/registerEmail'
import RegisterMailsent from './../view/registerEmailsent'
import RegisterMailstep from './../view/registerEmailstep'






class route extends Component{
	render(){
		return (
			<BrowserRouter basename="/gayligayli">
				<Provider store={store}>
					<App>
						<Switch>

							{/* 用户功能 */}
								{/* 登录 */}
								<Route exact path="/login" component={Login} />
								{/* 注册 */}
								<Route exact path="/register" component={Register} />
								{/* 邮箱注册 */}
								<Route exact path="/register/mail" component={RegisterMail} />
								{/* 邮箱注册(已发送邮件) */}
								<Route exact path="/register/mailsent" component={RegisterMailsent} />
								{/* 邮箱注册(已验证邮件) */}
								<Route exact path="/register/mailStep" component={RegisterMailstep} />
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
