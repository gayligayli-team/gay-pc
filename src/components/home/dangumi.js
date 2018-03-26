import React, { Component } from "react"
import './../../static/css/dangumi.css'



class Chat extends Component{
	constructor(props){
		super(props)
		this.state = {
			list: [
				{
					time: 93,
					text: "测试测试车是是测试测试车是是测试测试车是是测试测试车是是测试测试车是是测试测试车是是",
					unix: 1517149674,
				},{
					time: 93,
					text: "测试测试车是是测试测试车是是测试测试车是是测试测试车是是测试测试车是是测试测试车是是",
					unix: 1517149674,
				}
			]
		}
	}
	componentDidMount(){

	}
	timeToStr = time => {
		let _sec = time%60||0;
		let _min = (time-_sec)/60||0;
		_min = _min>9?_min:("0"+_min);
		_sec = _sec>9?_sec:("0"+_sec);
		return _min+':'+_sec;
	}
	unixToStr = unix => {
		const time = new Date(unix*1000);
		let _m = time.getMonth()+1;
		let _d = time.getDate();
		let _h = time.getHours();
		let _min = time.getMinutes();
		_m = _m>9?_m:("0"+_m);
		_d = _d>9?_d:("0"+_d);
		_h = _h>9?_h:("0"+_h);
		_min = _min>9?_min:("0"+_min);
		let _time = _m+"-"+_d+" "+_h+":"+_min;
		return _time;
	}
	render(){
		return (
			<div className="dangumi">
				<div className="option">
					<p><em>4</em>人正在看，1078条弹幕</p>
					{/* 站内播放：411664
					站外播放：23449
					当前弹幕：1076
					普通弹幕上限：1000 */}
					<i className="icon_dangumi_option"></i>
					<i className="icon_dangumi_more"></i>
				</div>
				<div className="toggle">
					<span>推荐视频</span>
					<span className="active">弹幕列表</span>
					<span>屏蔽设置</span>
				</div>
				<div className="filter">
					<span className="time">时间</span>
					<span className="text">弹幕内容</span>
					<span className="unix">发送时间</span>
				</div>
				<div className="content">
					<ul>
						{this.state.list.map((child, index) => (
							<li key={index}>
								<span>{this.timeToStr(child.time)}</span>
								<span>{child.text}</span>
								<span>{this.unixToStr(child.unix)}</span>
							</li>
						))}
					</ul>
				</div>
				<div className="history">
					<p>查看历史弹幕</p>
				</div>
			</div>
		)
	}
}





export default Chat