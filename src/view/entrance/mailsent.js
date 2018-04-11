import React, { Component } from "react"
import { Link } from 'react-router-dom'
import './../../static/css/register.css'

import api from './../../api/fetch'
import validate from './../../api/validate'


import {
	Button,
} from '../../components/util/from'


class RegisterMain extends Component{
	constructor(props){
		super(props)
		/*
		 * @param
		 * type								String(text
		 * title							String(Empty
		 * value							String(Empty
		 * placeholder	|placeholder			String(Empty
		 * readonly							Boolean(False
		 * error	|提示					String(Null
		 *
		 * options	|options				Array([]
		 * disabled	|disabled				Boolean(False
		 * css		|class					String(Null
		 * width	|style					
		 * change	|event					Function(Null
		 */
		this.state = {
			submit: {
				title: "查看验证邮箱",
			},
		}
	}
	// 前往邮箱验证
	checkmail = _ => {
		console.log("前往验证邮箱")
	}
	render(){
		const email = this.props.location.email || '';
		return (
			<div className="user_main">
				<div className="register_content">
					<div className="main_title">
						<h1>注册</h1>
					</div>
					<div className="main_from email_box">
						<div>
							<p className="email_title">邮件已发送  <span>已向你的邮箱 {email} 发送了一份验证邮件</span></p>
							<p>
								<img src="https://static-s.bilibili.com/passport/img/lr_33_03.jpg" />
							</p>
							<p></p>
							<p></p>
							<p></p>
							<p></p>
							<p></p>
							<p className="from_email center">
								收不到？
								<Link to='/register/mail'><span>重新发送验证邮箱></span></Link>
							</p>
							{/* 查看验证邮箱 */}
							<p className="center">
								<Button {...this.state.submit} click={this.checkmail} />
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default RegisterMain