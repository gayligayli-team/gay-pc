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
			submit: {
				title: "发送验证邮件",
			},
		}
	}
	emailChange = e => {
		this.setState({
			email: {
				...this.state.email,
				value: e.target.value,
			}
		})
	}
	phonecodeChange = e => {
		this.setState({
			phonecode: {
				...this.state.phonecode,
				value: e.target.value,
			}
		})
	}
	changeCheckbox = _ => {
		this.setState({
			agreement: {
				...this.state.agreement,
				checked: !this.state.agreement.checked
			},
			submit: {
				...this.state.submit,
				disabled: this.state.agreement.checked
			}
		});
	}
	sendMessage = _ =>{
		let data = {
			phone: this.state.phone.value,
			// area: this.state.area,
		}
		if(!validate.isNull(data.phone, '手机号') || !validate.phoneError(data.phone))return;
		api({
			url: 'entrance/sendmsg',
			type: 'POST',
			data,
		})
		.then(res => {
			if(res.result === 0){
				console.log("短信发送成功!");
				this.setState({
					sendCode: {
						...this.state.sendCode,
						disabled: true,
						remind: '重新获取验证码',
						sec: 60,
					}
				});
				this.msgTimeout();
			}else{
				console.warn(res);
			}
		}).catch(err => {
			console.log(err);
		});
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
		// this.props.history.push('/entrance/mailsent');
		if(!flag)return;
		this.props.history.push('/entrance/checkMail');
		// {
		// 	path: '/entrance/checkMail',
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
						<p>邮件已发送  已向你的邮箱 10086@qq.com 发送了一份验证邮件</p>
						<p>
							<img src="https://static-s.bilibili.com/passport/img/lr_33_03.jpg" />
						</p>
						<p className="from_email">
							收不到？
							<Link to='/entrance/register'><span>重新发送验证邮箱></span></Link>
						</p>
						{/* 查看验证邮箱 */}
						<Button {...this.state.submit} click={this.fromSubmit} />
					</div>
				</div>
			</div>
		)
	}
}

export default RegisterMain