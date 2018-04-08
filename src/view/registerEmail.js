import React, { Component } from "react"


import Header from '../components/util/navmenu'
import Footer from '../components/util/footer'

import MailRegister from './entrance/mail'


class Register extends Component{
	// constructor(props){
	// 	super(props)
	// }
	render(){
		return (
			<div className="user">
				{/* 首部 */}
				<Header />
				<div className="userHeader">
					<img src="https://www.alice47.com/img/rl_top.35edfde.png" alt="" />
				</div>
				<MailRegister />
				{/* 尾部 */}
				<Footer />
			</div>
		)
	}
}

export default Register