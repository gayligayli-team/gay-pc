import React, { Component } from "react"


import Header from '../components/util/navmenu'
import Footer from '../components/util/footer'

import UserLogin from './user/login'
// import UserRegister from './user/register'


class User extends Component{
	// constructor(props){
	// 	super(props)
	// }
	render(){
		return (
			<div className="user">
				{/* 首部 */}
				<Header {...this.props} />
				<div className="userHeader">
					<img src="https://www.alice47.com/img/rl_top.35edfde.png" alt="" />
				</div>
				<UserLogin {...this.props} />
				{/* 尾部 */}
				<Footer />
			</div>
		)
	}
}

export default User