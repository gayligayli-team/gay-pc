import React, { Component } from "react"
import { Link } from 'react-router-dom'
import './../../static/css/wrap.css'

// wrap-module
class WrapColumn extends Component{
	constructor(props){
		super(props)
		this.state = {
			// dynamic: 动态, newlist: 新投稿
			tabIndex: true
		}
	}
	changeTab = e => {
		if(e.target.getAttribute('class')==='on')return;
		if(this.state.tabIndex){
			// "dynamic"
		}else{
			// "newlist"
		}
		this.setState({
			tabIndex: !this.state.tabIndex
		});
	}
	render(){
		return (
			<div className="wrapColumn">
				{/* wrapColumn-title */}
				<div className="title clear">
					<div className="dynamic">
						<i className={`${this.props.title.icon}`}></i>
						<Link className="name" to='/home'>
							{this.props.title.text}
						</Link>
						<p>
							<span
							 onClick={this.changeTab}
							 className={this.state.tabIndex?"on":""}>有新动态</span>
							<span
							 onClick={this.changeTab}
							 className={!this.state.tabIndex?"on":""}>有新投稿</span>
						</p>
						<span className="fire">{this.props.title.fire}</span>
					</div>
					<div className="more">
						<span>{`${this.props.title.news}条新动态`}</span>
						<Link to='/home'>更多 ></Link>
					</div>
				</div>
				{/* wrapColumn-main */}
				<ul className="clear">
					{this.props.list.map((child, index) => (
						<li key={index}>
							<Link to={`/video/av${child.avid}`}>
								<img src={child.pic} alt="" />
								<p className="title">{child.title}</p>
								<p className="info">
									<span className="icon_play">{child.play}</span>
									<span className="icon_danmaku">{child.danmaku}</span>
								</p>
								<div>
									<span>{child.duration}</span>
									<i></i>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

class WrapRank extends Component{
	constructor(props){
		super(props)
		this.state = {
			// new: 全新, native: 原创
			tabIndex: true,
			dateIndex: 0,
			dateType: ["三日", "一周"]
		}
	}
	changeTab = e => {
		if(e.target.getAttribute('class')==='on')return;
		if(this.state.tabIndex){
			// "new"
		}else{
			// "native"
		}
		this.setState({
			tabIndex: !this.state.tabIndex
		});
	}
	changeRand = e => {
		if(this.state.dateIndex){
			// "new"
		}else{
			// "native"
		}
		this.setState({
			dateIndex: 1-this.state.dateIndex
		});
	}
	createtime = e => {
		if(!e)return "";
		const time = new Date(e*1000);
		let _y = time.getFullYear();
		let _m = time.getMonth()+1;
		let _d = time.getDate();
		let _h = time.getHours();
		let _min = time.getMinutes();
		let _time = _y+"-"+(_m<10?"0"+_m:_m)+"-"+(_d<10?"0"+_d:_d)+" "+(_h<10?"0"+_h:_h)+":"+(_min<10?"0"+_min:_min);
		return _time;
	}
	render(){
		return (
			<div className="wrapRank">
				{/* WrapRank-title */}
				<div className="title">
					<div className="rankTab">
						<span>排行</span>
						<p>
							<span
							 onMouseEnter={this.changeTab}
							 className={this.state.tabIndex?"on":""}>全新</span>
							<span
							 onMouseEnter={this.changeTab}
							 className={!this.state.tabIndex?"on":""}>原创</span>
						</p>
					</div>
					<div className="other">
						<span>{this.state.dateType[this.state.dateIndex]} ↓</span>
						<span
						 onClick={this.changeRand}>{this.state.dateType[1-this.state.dateIndex]}  </span>
					</div>
				</div>
				{/* WrapRank-main */}
				<ul className="clear">
					{this.props.list.map((child, index) => (
						<li key={index}>
							<p className="clear">
								<i>{index+1}</i>
								<Link className="tit" to={`/video/av${child.avid}`}>{child.title}</Link>
							</p>
							<div className="popupInfo">
								<p className="textTitle">{child.title}</p>
								<p>{child.author}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{this.createtime(child.create_unix)}</p>

								<p className="descript clear">
									<img src={child.pic} alt="" />
									<span>{child.description}</span>
								</p>

								<p className="statistic">
									<span className="icon_play">{child.play}</span>
									<span className="icon_danmaku">{child.danmaku}</span>
									<span className="icon_favorites">{child.favorites}</span>
									<span className="icon_coins">{child.coins}</span>
								</p>
							</div>
						</li>
					))}
					<Link className="more" to='/home'>查看更多 ></Link>
				</ul>
			</div>
		)
	}
}

class WrapDynamicColumn extends Component{
	constructor(props){
		super(props)
		// mock
		this.state = {
			selectList: [],
			week: ['最新', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			activedWeek: 0,
		}
	}
	componentWillReceiveProps(nextProps){
		// console.log(nextProps.list);
		if(nextProps.list!==0){
			this.selectList(0);
		}
	}
	changeTab = e => {
		if(e.target.getAttribute('class')==='active')return;
		let _index = +e.currentTarget.getAttribute('index');
		this.setState({
			activedWeek: _index,
		});
		this.selectList(_index);
	}
	selectList = n => {
		const old_list = this.props.list;
		const _list = n !== 0?
		old_list.filter(e => {
			return n === 7?e.weekday === 0:e.weekday === n;
		}):old_list.slice(0, 16);
		this.setState({
			selectList: _list
		});
	}

	render(){
		return (
			<div className="wrapDynamicColumn">
				{/* wrapDynamicColumn-title */}
				<div className="title clear">
					<div className="dynamic">
						<i className={`${this.props.dynamicColoumn.icon}`}></i>
						<Link className="name" to='/home'>
							{this.props.dynamicColoumn.text}
						</Link>
						<ul className="clear">
							{this.state.week.map((child, index) => (
								<li className={this.state.activedWeek===index?"active":""}
									 onClick={this.changeTab}
									 index={index}
									 key={index}>
									{!index||this.state.activedWeek===index?child:child[1]}
								</li>
							))}
						</ul>
					</div>
					<div className="more">
						<Link to='/home'>新番时间表 ></Link>
					</div>
				</div>
				{/* wrapDynamicColumn-main */}
				<ul className="wrapDynamic clear">
					{this.state.selectList.map((child, index) => (
						<li className="clear" key={index}>
							<img src={child.square_cover} alt={child.title} />
							<div>
								<span>{child.title}</span>
								{/* <span>更新至<Link to='/home'>{child.title}</Link></span> */}
								{
									child.bgmcount!=="-1"?
									<span>更新至<em className={child.new?"new":""}>{child.bgmcount}话</em></span>:
									<span>尚未更新</span>
								}
							</div>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export {
	WrapColumn,
	WrapRank,
	WrapDynamicColumn,
}

// module.exports = WrapModule