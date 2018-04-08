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
			phone: {
				type: "tel",
				name: "phone",
				placeholder: "填写常用手机号",
				value: "",
				width: 300,
				max: 11,
			},
			area: {
				type: "tel",
				name: "area",
				options: [{
					text: "中国大陆",
					value: "86",
				}, {
					text: "香港特别行政区",
					value: "852",
				}, {
					text: "澳门特别行政区",
					value: "853",
				}],
			},
			sendCode: {
				title: "点击获取",
				remind: "",
				disabled: false,
				css: "phone_send_message",
				sec: 0,
				width: 140,
			},
			phonecode: {
				type: "number",
				name: "phonecode",
				position: "absolute",
				value: "",
			},
			agreement: {
				type: "checkbox",
				checked: false,
			},
			submit: {
				title: "注册",
				disabled: true,
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
	phoneChange = e => {
		this.setState({
			phone: {
				...this.state.phone,
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
			name: this.state.alias.value,
			password: this.state.password.value,
			phone: this.state.phone.value,
			phonecode: this.state.phonecode.value,
		}
		let flag = validate.isNull(data.name, '昵称') && validate.nameError(data.name) &&
		validate.isNull(data.password, '密码') && validate.psdError(data.password) &&
		validate.isNull(data.phone, '手机号') && validate.phoneError(data.phone) &&
		validate.isNull(data.phonecode, '验证码');
		if(!flag)return;
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
						<Input {...this.state.alias} changeValue={this.aliasChange} />
						<p className="security_level active">
							{/* <span>安全级别</span> */}
						</p>
						<Input {...this.state.password} changeValue={this.passwordChange} />
						<p></p>
						<label className="clear">
							<Select {...this.state.area} />
							<Input {...this.state.phone} changeValue={this.phoneChange} />
						</label>
						<p className="from_email">
							<Link to='/register/mail'><span>用邮箱注册&gt;</span></Link>
						</p>
						<p className="from_phone">
							<Input {...this.state.phonecode} changeValue={this.phonecodeChange} />
							<Button {...this.state.sendCode} click={this.sendMessage} />
						</p>
						<p className="agreement clear">
							<Checkbox {...this.state.agreement} change={this.changeCheckbox} />
							<span>我已同意<Link to='/login/email'><em>《gayligayli用户使用协议》</em></Link></span>
						</p>
						{/* 注册 */}
						<Button {...this.state.submit} click={this.fromSubmit} />
						<p className="from_email">
							<Link to='/login'><span>已有账号，直接登录&gt;</span></Link>
						</p>
					</div>
				</div>
			</div>
		)
	}
}

export default RegisterMain