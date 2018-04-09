import React, { Component } from "react"
import { Link } from 'react-router-dom'
import './../../static/css/register.css'

import api from './../../api/fetch'
import validate from './../../api/validate'


import {
	Input,
	Checkbox,
	Select,
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
			alias: {
				type: "text",
				name: "alias",
				placeholder: "昵称（例：gay）",
				value: "",
				max: 12,
			},
			password: {
				type: "password",
				name: "pwd",
				placeholder: "密码（6-18个字符组成，区分大小写）",
				value: "",
				max: 18,
			},
			submit: {
				title: "创建账号",
			},
		}
	}
	aliasChange = e => {
		this.setState({
			alias: {
				...this.state.alias,
				value: e.target.value,
			}
		})
	}
	passwordChange = e => {
		this.setState({
			password: {
				...this.state.password,
				value: e.target.value,
			}
		})
	}
	msgTimeout = _ => {
		let sec = this.state.sendCode.sec - 1;
		this.clearTimeout = setTimeout(_ => {
			if(sec > 0){
				this.setState({
					sendCode: {
						...this.state.sendCode,
						remind: `${sec}秒后重新获取`,
						sec,
					}
				});
				this.msgTimeout();
			}else{
				this.setState({
					sendCode: {
						...this.state.sendCode,
						disabled: false,
						remind: '',
						sec: 0,
					}
				});
			}
		}, 1000);
	}
	fromSubmit = _ => {
		let data = {
			email: this.state.email.value,
			phonecode: this.state.phonecode.value,
		}
		let flag = validate.isNull(data.email, '邮箱') && validate.emailError(data.email) &&
		validate.isNull(data.phonecode, '验证码');
		// this.props.history.push('/register/mailsent');
		if(!flag)return;
		// this.props.history.push('/register/checkMail');
		// this.props.history.push('/register/mailStep');
		// {
		// 	path: '/register/checkMail',
		// 	params: {
		// 		email: data.email
		// 	}
		// }
		api({
			url: 'entrance/register',
			type: 'POST',
			data,
		})
		.then(res => {
			if(res.result === 0){
				console.log(res.msg);
			}else{
				console.warn(res);
			}
		}).catch(err => {
			console.log(err);
		});
	}
	render(){
		return (
			<div className="user_main">
				<div className="register_content">
					<div className="main_title">
						<h1>注册</h1>
					</div>
					<div className="main_from">
						<p>ICON 邮箱验证成功，你的邮箱是: 10086@qq.com</p>
						<p>
							<img src="https://static-s.bilibili.com/passport/img/lr_22_03.jpg" />
						</p>
						<p></p>
						<p></p>
						<p></p>
						<p></p>
						<p></p>
						<Input {...this.state.alias} changeValue={this.aliasChange} />
						<p className="security_level active">
							{/* <span>安全级别</span> */}
						</p>
						<Input {...this.state.password} changeValue={this.passwordChange} />
						<p></p>
						{/* 邮箱注册 */}
						<Button {...this.state.submit} click={this.fromSubmit} />
					</div>
				</div>
			</div>
		)
	}
}

export default RegisterMain