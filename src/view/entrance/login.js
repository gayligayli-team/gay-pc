import React, { Component } from "react"
import { Link } from 'react-router-dom'
import './../../static/css/login.css'

import api from './../../api/fetch'
import validate from './../../api/validate'

import RegSlider from '../../components/util/register_slider'

import {
	Input,
	Checkbox,
	Button,
} from '../../components/util/from'



class LoginMain extends Component{
	constructor(props){
		super(props)
		this.state = {
			id: {
				type: "text",
				name: "id",
				placeholder: "你的手机号", // "你的手机号/邮箱",
				value: '10086',
			},
			password: {
				type: "password",
				name: "pwd",
				placeholder: "密码",
				value: '123456',
			},
			login: {
				title: "登录",
				// disabled: false,
				width: 185,
			},
			remember: {
				type: "checkbox",
				value: 0,
			},
			slidecode: {
				flag: false,
				token: "",
			},
			register: {
				title: "注册",
				css: 'native',
				width: 185,
			},
			imgValid: {
				x: 120,
				y: 60,
			},
		}
		// 登录状态
		setTimeout(_ => {
			let loginID = localStorage.getItem('UserID') || sessionStorage.getItem('UserID');
			let loginMD5 = localStorage.getItem('UserID_ckMD5') || sessionStorage.getItem('UserID_ckMD5');
			if(loginID&&loginMD5){
				this.props.history.push('/');
			}
		}, 500);
	}
	updateValidate = token => {
		this.setState({
			slidecode: {
				flag: true,
				token,
			}
		})
	}
	idChange = e => {
		this.setState({
			id: {
				...this.state.id,
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
	isRemember = _ => {
		this.setState({
			remember: {
				...this.state.remember,
				value: this.state.remember.value?0:1,
			},
		});
	}
	fromSubmit = _ => {
		// this.props.history.push('/');
		let data = {
			phone: this.state.id.value,
			password: this.state.password.value,
			remember: this.state.remember.value,
			token: this.state.slidecode.token,
		}
		let flag = validate.isNull(data.phone, '手机号') && // validate.phoneError(data.phone) &&
		validate.isNull(data.password, '密码') && validate.psdError(data.password) &&
		validate.pointError(this.state.slidecode.flag);
		if(!flag)return;
		api({
			url: 'entrance/login',
			type: 'POST',
			data,
		})
		.then(res => {
			if(res.result === 0){
				if(data.remember){
					localStorage.setItem('UserID', res.data.mid);
					localStorage.setItem('UserID_ckMD5', res.data.md5);
				}else{
					sessionStorage.setItem('UserID', res.data.mid);
					sessionStorage.setItem('UserID_ckMD5', res.data.md5);
				}
				setTimeout(_ => {
					this.props.history.push('/');
				}, 500);
				// console.log(res.msg, res.data);
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
				<div className="login_content claer">
					<div className="main_title">
						<h1>登录</h1>
					</div>
					<div className="clear">
						<div className="app_qrcode">
							{/* app二维码 */}
						</div>
						<div className="main_from">
							<Input {...this.state.id} changeValue={this.idChange}  />
							<p></p>
							<Input {...this.state.password} changeValue={this.passwordChange} />
							{/* 滑动验证码 */}
							<RegSlider 
								validing={this.updateValidate}
								{...this.state.imgValid} />
							<p className="remember clear">
								<Checkbox {...this.state.remember} change={this.isRemember} />
								<span>记住我<em>不是自己的电脑上不要勾选此项</em></span>
								<span className="other">
									{/* 
									<Link to='/help'><em>无法验证？</em></Link>&nbsp;
									 */}
									<Link to='/resetpwd'><em>忘记密码？</em></Link>
								</span>
							</p>
							<p className="from_login">
								<Button {...this.state.login} click={this.fromSubmit} />
								<Link to='/register'>
									<Button {...this.state.register} />
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default LoginMain