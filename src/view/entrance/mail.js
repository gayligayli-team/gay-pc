import React, { Component } from "react"
import { Link } from 'react-router-dom'
import './../../static/css/register.css'

import api from './../../api/fetch'
import validate from './../../api/validate'


import {
	Input,
	Checkbox,
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
			email: {
				type: "text",
				name: "email",
				placeholder: "填写常用邮箱",
				value: "307493394@qq.com",
			},
			sendCode: {
				title: "123456",
				disabled: true,
				css: "phone_send_message",
				width: 140,
			},
			photocode: {
				type: "text",
				name: "photocode",
				placeholder: "请输入验证码",
				value: "",
				width: 240,
				max: 6,
			},
			agreement: {
				type: "checkbox",
				checked: false,
			},
			submit: {
				title: "发送验证邮件",
				disabled: true,
			},
			captchaSrc: '',
		}
	}
	componentWillMount(){
		this.queryCaptcha();
	}
	// 获取验证码
	queryCaptcha = e => {
		api({
			url: 'captcha',
			file: 'blob',
		})
		.then(json => {
			let blob=new Blob([json]);
			// Blob => URL-String
			let url = URL.createObjectURL(blob);
			this.setState({
				captchaSrc: url
			});
		}).catch(err => {
			console.log(err);
		});
	}
	emailChange = e => {
		this.setState({
			email: {
				...this.state.email,
				value: e.target.value,
			}
		})
	}
	photocodeChange = e => {
		this.setState({
			photocode: {
				...this.state.photocode,
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
	// reload验证码
	sendMessage = _ =>{
		console.log("获取图形验证码");
	}
	// 发送邮件
	fromSubmit = _ => {
		let data = {
			email: this.state.email.value,
			photocode: this.state.photocode.value,
		}
		let flag = validate.isNull(data.email, '邮箱') && validate.emailError(data.email) &&
		validate.isNull(data.photocode, '验证码');
		if(!flag)return;
		console.log("发送邮件");
		api({
			url: 'entrance/sendmail',
			type: 'POST',
			data,
		})
		.then(res => {
			if(res.result === 0){
				this.props.history.push({
					pathname: '/entrance/mailsent',
					email: data.email,
				});
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
						<Input {...this.state.email} changeValue={this.emailChange} />
						<p className="from_email">
							<Link to='/entrance/register'><span>用手机注册&gt;</span></Link>
						</p>
						<p className="from_phone">
							<Input {...this.state.photocode} changeValue={this.photocodeChange} />
							<img onClick={this.queryCaptcha} className="photo_captcha" src={this.state.captchaSrc} alt="" />
						</p>
						<p className="agreement clear">
							<Checkbox {...this.state.agreement} change={this.changeCheckbox} />
							<span>我已同意<Link to='/entrance/licence'><em>《gayligayli用户使用协议》</em></Link></span>
						</p>
						{/* 发送注册邮件 */}
						<Button {...this.state.submit} click={this.fromSubmit} />
						<p className="from_email">
							<Link to='/entrance/login'><span>已有账号，直接登录&gt;</span></Link>
						</p>
					</div>
				</div>
			</div>
		)
	}
}

export default RegisterMain