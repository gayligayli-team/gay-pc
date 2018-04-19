	import React, { Component } from "react"
import { Link } from 'react-router-dom'
import './../../static/css/register.css'

import api from './../../api/fetch'
import validate from './../../api/validate'


import {
	Input,
	Button,
} from '../../components/util/from'



class Reset extends Component{
	constructor(props){
		super(props)
		this.state = {
			phone: {
				type: "text",
				name: "phone",
				placeholder: "请输入手机号",
				value: '10086',
			},
			email: {
				type: "text",
				name: "email",
				placeholder: "请输入邮箱",
				value: '10086@gayligayli.com',
			},
			photocode: {
				type: "text",
				name: "photocode",
				placeholder: "验证码",
				value: "",
				width: 180,
				max: 6,
			},
			phoneSubmit: {
				title: "发送到手机",
			},
			emailSubmit: {
				title: "发送到验证邮箱",
			},
			submitState: 1,
			captchaSrc: '',
			// 1:phone, 0:email
		}
	}
	componentWillMount(){
		this.queryCaptcha();
	}
	// 获取验证码
	queryCaptcha = _ => {
		let t = Math.random();
		api({
			url: 'captcha',
			file: 'blob',
			data: {
				t,
			},
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
	phoneChange = e => {
		this.setState({
			phone: {
				...this.state.phone,
				value: e.target.value,
			}
		})
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
	// 短信验证码找回
	fromPhoneSubmit = _ =>{
		let data = {
			dopost: 'mobile_getpwd',
			phone: this.state.phone.value,
			photocode: this.state.photocode.value,
		}
		let flag = validate.isNull(data.phone, '手机号') && validate.phoneError(data.phone) && validate.isNull(data.photocode, '验证码');
		if(!flag)return;
		api({
			url: 'entrance/sendremsg',
			type: 'POST',
			data,
		})
		.then(res => {
			if(res.result === 0){
				console.log("短信发送成功!");
				let mobileKey = res.data.mobileKey;
				this.props.history.push(`/entrance/resetpwd?mobileKey=${mobileKey}`);
			}else{
				console.warn(res);
			}
		}).catch(err => {
			console.log(err);
		});
	}
	// 邮件找回
	fromMailSubmit = _ => {
		let data = {
			dopost: 'email_getpwd',
			email: this.state.email.value,
			photocode: this.state.photocode.value,
		}
		let flag = validate.isNull(data.email, '邮箱') && validate.emailError(data.email) &&
		validate.isNull(data.photocode, '验证码');
		if(!flag)return;
		api({
			url: 'entrance/sendremsg',
			type: 'POST',
			data,
		})
		.then(res => {
			if(res.result === 0){
				console.log("邮件发送成功!");
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
				<div className="register_content claer">
					<div className="main_title">
						<h1>找回</h1>
					</div>
					{/* 发送手机验证 */}
					<div className={`${this.state.submitState?"active ":""}main_from`}>
						<Input {...this.state.phone} changeValue={this.phoneChange} />
						<p></p>
						<p className="captcha">
							<Input {...this.state.photocode} changeValue={this.photocodeChange} />
							<img onClick={this.queryCaptcha} className="photo_captcha" src={this.state.captchaSrc} alt="" />
						</p>
						<p></p>
						<Button {...this.state.phoneSubmit} click={this.fromPhoneSubmit} />
						<p className="from_email">
							<Link to='/entrance/login'><span>返回登录&gt;</span></Link>
						</p>
					</div>
					<hr />
					{/* 发送邮件验证 */}
					<div className={`${!this.state.submitState?"active ":""}main_from`}>
						<Input {...this.state.email} changeValue={this.emailChange} />
						<p></p>
						<p className="captcha">
							<Input {...this.state.photocode} changeValue={this.photocodeChange} />
							<img onClick={this.queryCaptcha} className="photo_captcha" src={this.state.captchaSrc} alt="" />
						</p>
						<p></p>
						<Button {...this.state.emailSubmit} click={this.fromMailSubmit} />
						<p className="from_email">
							<Link to='/entrance/login'><span>返回登录&gt;</span></Link>
						</p>
					</div>
				</div>
			</div>
		)
	}
}

export default Reset