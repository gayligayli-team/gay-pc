import React, { Component } from "react"
import './../../static/css/register.css'

import api from './../../api/fetch'
import validate from './../../api/validate'


import {
	Input,
	Button,
} from '../../components/util/from'


class Resetpwd extends Component{
	constructor(props){
		super(props)
		this.state = {
			password: {
				type: "password",
				name: "pwd",
				placeholder: "请输入密码",
				value: '123456',
			},
			passwordConfirm: {
				type: "password",
				name: "pwd",
				placeholder: "请再次输入密码",
				value: '123456',
			},
			phonecode: {
				type: "text",
				name: "phonecode",
				placeholder: "验证码",
				value: "123456",
				width: 180,
				max: 6,
			},
			submit: {
				title: "确认修改",
			},
			step: 1,
			// 1:phone, 0:email
		}
	}
	componentWillMount(){
		let {mobileKey, time, id, sign} = this.queryString();
		if(!!mobileKey){
			validate.isNull(mobileKey, '链接超时');
			document.cookie = `key=${mobileKey};path=/`;
			this.setState({
				step: 1,
			});
		}else{
			validate.isNull(id, '链接超时') && validate.isNull(sign, '链接超时');
			document.cookie = `id=${id};path=/`;
			document.cookie = `unix=${time};path=/`;
			document.cookie = `sid=${sign};path=/`;
			this.setState({
				step: 0,
			});
		}
	}
	// 转换地址
	queryString = _ => {
		let str = this.props.location.search.split('?')[1];
		if(typeof str === 'undefined')return {};
		let temp = str.split('&');
		let result = {};
		let len = temp.length;
		for(let i=0; i<len; i++){
			let [k, v] = temp[i].split('=');
			result[k] = v;
		}
		return result;
	}
	pwdChange = e => {
		this.setState({
			password: {
				...this.state.password,
				value: e.target.value,
			}
		})
	}
	pwdConfirmChange = e => {
		this.setState({
			passwordConfirm: {
				...this.state.passwordConfirm,
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
	// 重置密码
	fromSubmit = _ => {
		let data = {
			step: this.state.step,
			password: this.state.password.value,
			passwordConfirm: this.state.passwordConfirm.value,
		}
		!!data.step && (data.phonecode = this.state.phonecode.value);
		let flag = (validate.isNull(data.password, '密码') && validate.psdError(data.password) &&
		validate.isNull(data.password, '确认密码') && validate.psdConfirmError(data.password, data.passwordConfirm)) ||
		(!!data.step && validate.isNull(data.phonecode, '验证码'));
		if(!flag )return;
		api({
			url: 'entrance/resetpwd',
			type: 'POST',
			data,
		})
		.then(res => {
			if(res.result === 0){
				console.log("密码重置成功!");
				this.props.history.push(`/entrance/login`);
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
						<h1>重置</h1>
					</div>
					{/* 发送手机验证 */}
					<div className="main_from resetpwd">
						<Input {...this.state.password} changeValue={this.pwdChange} />
						<p></p>
						<Input {...this.state.passwordConfirm} changeValue={this.pwdConfirmChange} />
						<p></p>
						<p className={`${this.state.step?"active ":""}from_phone`}>
							<Input {...this.state.phonecode} changeValue={this.phonecodeChange} />
						</p>
						<p className={`${this.state.step?"":"hide"}`}></p>
						<Button {...this.state.submit} click={this.fromSubmit} />
					</div>
				</div>
			</div>
		)
	}
}

export default Resetpwd