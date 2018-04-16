import React, { Component } from "react"
import { Route, Switch } from 'react-router-dom'


import Header from '../components/util/navmenu'
import Footer from '../components/util/footer'


import Login from './entrance/login'
import Register from './entrance/register'
import Mail from './entrance/mail'
import Mailsent from './entrance/mailsent'
import Mailstep from './entrance/mailstep'
import Reset from './entrance/reset'
import Resetpwd from './entrance/resetpwd'

class Entrance extends Component{
	render(){
		return (
			<div className="user">
				{/* 首部 */}
				<Header {...this.props} />
				<div className="userHeader">
					<img src="https://www.alice47.com/img/rl_top.35edfde.png" alt="" />
				</div>
					{/* 内容 */}
					<Switch>
						{/* 登录 */}
						<Route exact path="/entrance/login" component={Login} />
						{/* 注册 */}
						<Route exact path="/entrance/register" component={Register} />
						{/* 邮箱注册 */}
						<Route exact path="/entrance/mail" component={Mail} />
						{/* 邮箱注册(已发送邮件) */}
						<Route exact path="/entrance/mailsent" component={Mailsent} />
						{/* 邮箱注册(已验证邮件) */}
						<Route exact path="/entrance/mailStep" component={Mailstep} />
						{/* 找回密码 */}
						<Route exact path="/entrance/reset" component={Reset} />
						{/* 找回密码(重置密码) */}
						<Route exact path="/entrance/resetpwd" component={Resetpwd} />
					</Switch>
					{this.props.children}
				{/* 尾部 */}
				<Footer />
			</div>
		)
	}
}


export default Entrance