import React, { Component } from "react"
import { Link } from 'react-router-dom'
import './../../static/css/header.css'

import api from './../../api/fetch'

// 导航
class Navmenu extends Component {
	render(){
		return (
			<div className="navMenu">
				<div className="center clear">
					<HeaderList />
					<LoginHistory {...this.props} />
				</div>
			</div>
		)
	}
}


// 菜单栏
class HeaderList extends Component {
	constructor(props){
		super(props)
		// this.data
		this.state = {
			headerList: ['主站','画友','游戏中心','直播','会员购','周边','移动端']
		}
	}
	render(){
		return (
			<div className="fl clear">
				{this.state.headerList.map(item => (
					<Link to="/" key={item}>{item}</Link>
				))}
			</div>
		)
	}
}
// 登录&注册
class LoginHistory extends Component {
	constructor(props){
		super(props)
		// 登录状态
		let userId = localStorage.getItem('UserID') || sessionStorage.getItem('UserID');
		let userMD5 = localStorage.getItem('UserID_ckMD5') || sessionStorage.getItem('UserID_ckMD5');
		let userState = userId&&userMD5?true:false;
		userState&&this.getUserInfo(userId, userMD5);
		this.state = {
			loading: false,
			userState,
			face: "",
			alias: "",
			coins: 0,
		}
	}
	getUserInfo = (mid, md5) => {
		api({
			url: 'getMyInfo',
			type: 'GET',
			data: {
				mid,
				md5
			},
		})
		.then(res => {
			if(res.result === 0){
				this.setState({
					loading: true,
					face: res.data.face,
					alias: res.data.name,
					coins: res.data.coins,
				});
				// console.log(res.msg, res.data);
			}else{
				this.setState({
					loading: true,
					userState: false,
				});
				localStorage.removeItem('UserID') || sessionStorage.removeItem('UserID');
				localStorage.removeItem('UserID_ckMD5') || sessionStorage.removeItem('UserID_ckMD5');
				console.warn(res);
			}
		}).catch(err => {
			console.log(err);
		});
	}
	userLogout = _ => {
		let mid = localStorage.getItem('UserID') || sessionStorage.getItem('UserID');
		let md5 = localStorage.getItem('UserID_ckMD5') || sessionStorage.getItem('UserID_ckMD5');
		api({
			url: 'entrance/logout',
			type: 'POST',
			data: {
				mid,
				md5
			},
		})
		.then(res => {
			if(res.result === 0){
				this.setState({
					userState: false,
				});
				localStorage.removeItem('UserID') || sessionStorage.removeItem('UserID');
				localStorage.removeItem('UserID_ckMD5') || sessionStorage.removeItem('UserID_ckMD5');
				// this.props.history.push('/');
				console.log(res.msg);
			}else{
				console.warn(res);
			}
		}).catch(err => {
			console.log(err);
		});
	}
	render(){
		return this.state.userState?
			(
				<div className="loginHistory fr clear">
					{
						this.state.loading?
						(
							<div className="userInfo">
								<Link to="/index">
									<img className="userFace" src={this.state.face} alt="" />
								</Link>
								<div className="memberInfo">
									<div className="memberHeader">
										<p>{this.state.alias}</p>
										{/* <p>年度VIP</p> */}
										<ul className="clear">
											<li>硬币：{this.state.coins}</li>
										</ul>
									</div>
									<div className="memberMenu">
										<ul className="clear">
											<li className="icon_account">个人中心</li>
											<li className="icon_contribute">投稿管理</li>
											<li className="icon_wallet">用户钱包</li>
											<li className="icon_live">直播中心</li>
											<li className="icon_order">订单中心</li>
										</ul>
									</div>
									<div className="memberOut">
										<span onClick={this.userLogout}>退出</span>
									</div>
								</div>
							</div>
						):
						(
							<Link to="/login">
								<i className="navLogin"></i>
							</Link>
						)
					}
					<span>Vip</span>
					<span>消息</span>
					<span>动态</span>
					<span>稍后再看</span>
					<span>收藏夹</span>
					<span>历史</span>
					<i className="contribute">投  稿</i>
				</div>
			):
			(
				<div className="loginHistory fr clear">
					<Link to="/login">
						<i className="navLogin"></i>
					</Link>
					<span>历史</span>
					<i className="contribute">投  稿</i>
				</div>
			)
	}
}


export default Navmenu