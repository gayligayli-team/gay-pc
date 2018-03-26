import React, { Component } from "react"
import { Link } from 'react-router-dom'
import './../../static/css/footer.css'

// 底部通用
class Footer extends Component {
	constructor(props){
		super(props)
		// this.data
		this.state = {
			
		}
	}
	render(){
		return (
			<div className="footer">
				<div className="center">
					<FriendLink />
					<Partner />
				</div>
			</div>
		)
	}
}


// 友链
class FriendLink extends Component {
	constructor(props){
		super(props)
		// this.data
		this.state = {
			warp: [
				{
					tips: "gayligayli",
					title: "us",
					list: [
						"关于我们",
						"友情链接",
						"周边",
						"联系我们",
						"加入我们",
						"官方认证",
					],
				},{
					tips: "传送门",
					title: "link",
					list: [
						"帮助中心",
						"高级弹幕",
						"活动专题页",
						"侵权申诉",
						"分院帽计划",
						"活动中心",
						"用户反馈论坛",
						"壁纸站",
						"名人堂",
					],
				}
			],
			qrcode: [{
				title: "手机端下载",
				icon: "icon_app",
				uri: "https://www.alice47.com/gayligayli",
				src: "https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxgetmsgimg?&MsgID=94307901651193191&skey=%40crypt_d19d8745_54d5b90666e6d9a6f79e3dd602b74fc5&type=slave"
			},{
				title: "新浪微博",
				icon: "icon_webo",
				uri: "https://www.alice47.com/gayligayli",
				src: "https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxgetmsgimg?&MsgID=94307901651193191&skey=%40crypt_d19d8745_54d5b90666e6d9a6f79e3dd602b74fc5&type=slave"
			},{
				title: "官方微信",
				icon: "icon_wechat",
				uri: "https://www.alice47.com/gayligayli",
				src: "https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxgetmsgimg?&MsgID=94307901651193191&skey=%40crypt_d19d8745_54d5b90666e6d9a6f79e3dd602b74fc5&type=slave"
			}]
		};
	}
	render(){
		return (
			<div className="friendlink clear">
				{this.state.warp.map((e,i) => (
					<Warp warp={e} key={i} />
				))}
				<div className="downloadShare">
					<ul className="clear">
						{this.state.qrcode.map((qrcode,i) => (
							<li key={i}>
								<i className={qrcode.icon}></i>
								<p>{qrcode.title}</p>
								<div className="qrcodeBox">
									<img src={qrcode.src} alt="" />
									<i className="shade"></i>
									<i className="border"></i>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		)
	}
}
// 板块
class Warp extends Component {
	render(){
		return (
			<div className={this.props.warp.css}>
				<p>{this.props.warp.tips}</p>
				<ul className="warpList clear">
					{this.props.warp.list.map(item => (
						<li key={item}>
							<Link to="/">{item}</Link>
						</li>
					))}
				</ul>
			</div>
		)
	}
}
// 合作
class Partner extends Component {
	render(){
		return (
			<div className="partner">
				<span>Copyright ©2017-2018</span>
				<a href="http://www.miitbeian.gov.cn" target="_blank" rel="noopener noreferrer">粤ICP备17098477号-1</a>
			</div>
		)
	}
}

export default Footer