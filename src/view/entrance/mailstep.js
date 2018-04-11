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
			mid: '',
			email: '',
			unix: 0,
			sign: '',
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
	componentWillMount(){
		let {mid, email, time, sign} = this.queryString();
		this.setState({
			mid,
			email,
			unix: time,
			sign,
		})
	}
	// 转换地址
	queryString = _ => {
		let result = {};
		let str = this.props.location.search.split('?')[1];
		let temp = str.split('&');
		let len = temp.length;
		for(let i=0; i<len; i++){
			let [k, v] = temp[i].split('=');
			result[k] = v;
		}
		return result;
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
	// 提交注册
	fromSubmit = _ => {
		let {mid, email, unix, sign} = this.state;
		let data = {
			mid,
			email,
			unix,
			sign,
			name: this.state.alias.value,
			password: this.state.password.value,
		}
		let flag = validate.nameError(data.name) &&
			validate.isNull(data.password, '密码') &&
			validate.psdError(data.password);
		if(!flag)return;
		console.log("邮箱注册");
		api({
			url: 'entrance/registermail',
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
					<div className="main_from email_box">
						<div>
							<p>ICON 邮箱验证成功，你的邮箱是: <b>{this.state.email}</b></p>
							<p>
								<img src="https://static-s.bilibili.com/passport/img/lr_22_03.jpg" />
							</p>
							<p></p>
							<p></p>
							<p></p>
							<p></p>
							<p></p>
							<p>请输入昵称和密码，创建你的gayligayli账号</p>
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
			</div>
		)
	}
}

export default RegisterMain