import React, { Component } from "react"
import './../../static/css/home.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import api from './../../api/fetch'
import action from './../../api/action'

// component
import {
	WrapDynamicColumn,
	WrapColumn,
	WrapRank
} from '../../components/util/wrap'



// mapStateToProps
const mapStateToProps = state => {
	return {
		...state.home
	}
}

// mapDispatchToProps
function mapDispatchToProps(dispatch){
	return {
		updateRecommend: _ => {
			api({url:'getNavList'})
			.then(res => {
				return dispatch({
					...action.update_recommend,
					data: {
						recommendList: res.data.list.recommendList,
						recommendBox: res.data.list.recommendBox
					}
				})
			})
		},
		updateColumnConfig: _ => {
			api({url:'getColumnConfig'})
			.then(res => {
				return dispatch({
					...action.update_column_config,
					data: res.data.list,
				})
			})
		},
		updateColumnList: (type, name) => {
			api({
				url:'getColumnList',
				data: {
					type,
				}
			})
			.then(res => {
				return dispatch({
					...action.update_column_list[name],
					data: res.data.list,
				})
			});
		},
		updateRankList: (type, name) => {
			api({
				url:'getRankList',
				data: {
					type,
				}
			})
			.then(res => {
				return dispatch({
					...action.update_rank_list[name],
					data: res.data.list,
				})
			});
		},
		updateBangumiList: _ => {
			api({url:'getBangumiList'})
			.then(res => {
				return dispatch({
					...action.update_bangumi_list,
					data: res.data.list,
				})
			});
		},
	}
}


// 内容
class HomeMain extends Component{
	constructor(props){
		super(props)
		this.state = {
			sideList: [
				{
				// 	sort: -1,
				// 	text: "推广"
				// },{
				// 	sort: -1,
				// 	text: "直播"
				// },{
					sort: 1,
					text: "动画",
					name: "animate"
				},{
					sort: 2,
					text: "番剧",
					name: "bangumi"
				},{
					sort: 3,
					text: "国创",
					name: "bangumiCN"
				},{
					sort: 4,
					text: "音乐",
					name: "music"
				},{
					sort: 5,
					text: "舞蹈",
					name: "dance"
				},{
					sort: 6,
					text: "游戏",
					name: "game"
				},{
					sort: 7,
					text: "科技",
					name: "technology"
				},{
					sort: 8,
					text: "生活",
					name: "life"
				},{
					sort: 9,
					text: "鬼畜",
					name: "kichiku"
				},{
					sort: 10,
					text: "时尚",
					name: "fashion"
				},{
					sort: 11,
					text: "广告",
					name: "ad"
				},{
					sort: 12,
					text: "娱乐",
					name: "happy"
				},{
					sort: 13,
					text: "电影",
					name: "movie"
				},{
					sort: 14,
					text: "TV剧",
					name: "teleplay"
				},{
					sort: 15,
					text: "影视",
					name: "cinephile"
				},{
					sort: 16,
					text: "纪录片",
					name: "documentary"
				// },{
				// 	sort: -1,
				// 	text: "推荐"
				},
			],
			activeSort: 0
		}
	}
	componentDidMount(){
		const {
			updateRecommend,
			updateColumnConfig,
			updateColumnList,
			updateRankList,
			updateBangumiList,
		} = this.props

		// 加载轮播图、近日推荐
		updateRecommend()
		// 加载专栏配置
		updateColumnConfig()
		// 加载视频专栏列表
		this.state.sideList.forEach(e => {
			updateColumnList(e.sort, e.name)
		});
		// 加载视频专栏列表
		this.state.sideList.forEach(e => {
			updateRankList(e.sort, e.name)
		});
		// 加载番剧专栏列表
		updateBangumiList()

	}
	render(){
		const {
			recommendList,
			recommendBox,
			columnConfig,
			columnList,
			rankList,
			bangumiList,
		} = this.props
		return (
			<div>
				<div className="main">
					{/* recommend */}
					<div className="recommend clear">
						<div className="fl">
							<Swiper list={recommendList} />
						</div>
						<div className="fr">
							<Recommend list={recommendBox} />
						</div>
					</div>
					{/* popularize */}
					{/* <div className="popularize clear">
						<div className="fl">
							<WrapColumn title={columnConfig.animate} list={columnList.animate} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.animate} />
						</div>
					</div> */}
					{/* banner */}
					<Banner />
					{/* live */}
					{/* <div className="liveBroadcast clear">
						<div className="fl">
							<WrapColumn title={columnConfig.live} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.live} />
						</div>
					</div>*/}

					{/* animate */}
					<div className="animate clear">
						<div className="fl">
							<WrapColumn title={columnConfig.animate} list={columnList.animate} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.animate} />
						</div>
					</div>

					{/* bangumi */}
						{/* WrapDynamicColumn */}
						<div className="bangumi clear">
							<div className="fl">
								<WrapDynamicColumn dynamicColoumn={columnConfig.bangumiWeek} list={bangumiList} />
							</div>
							<div className="fr">
								<WrapRank list={rankList.rankLists} />
							</div>
						</div>
					<div className="bangumi clear">
						<div className="fl">
							<WrapColumn title={columnConfig.bangumi} list={columnList.bangumi} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.bangumi} />
						</div>
					</div>

					{/* bangumiCN */}
						{/* WrapDynamicColumn */}
						<div className="bangumiCN clear">
							<div className="fl">
								<WrapDynamicColumn dynamicColoumn={columnConfig.bangumiCNWeek} list={bangumiList} />
							</div>
							<div className="fr">
								<WrapRank list={rankList.rankLists} />
							</div>
						</div>
					<div className="bangumiCN clear">
						<div className="fl">
							<WrapColumn title={columnConfig.bangumiCN} list={columnList.bangumiCN} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.bangumiCN} />
						</div>
					</div>

					{/* music */}
					<div className="music clear">
						<div className="fl">
							<WrapColumn title={columnConfig.music} list={columnList.music} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.music} />
						</div>
					</div>

					{/* dance */}
					<div className="dance clear">
						<div className="fl">
							<WrapColumn title={columnConfig.dance} list={columnList.dance} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.dance} />
						</div>
					</div>

					{/* game */}
					<div className="game clear">
						<div className="fl">
							<WrapColumn title={columnConfig.game} list={columnList.game} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.game} />
						</div>
					</div>

					{/* technology */}
					<div className="technology clear">
						<div className="fl">
							<WrapColumn title={columnConfig.technology} list={columnList.technology} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.technology} />
						</div>
					</div>

					{/* life */}
					<div className="life clear">
						<div className="fl">
							<WrapColumn title={columnConfig.life} list={columnList.life} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.life} />
						</div>
					</div>

					{/* kichiku */}
					<div className="kichiku clear">
						<div className="fl">
							<WrapColumn title={columnConfig.kichiku} list={columnList.kichiku} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.kichiku} />
						</div>
					</div>

					{/* fashion */}
					<div className="fashion clear">
						<div className="fl">
							<WrapColumn title={columnConfig.fashion} list={columnList.fashion} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.fashion} />
						</div>
					</div>

					{/* advertisement */}
					<div className="ad clear">
						<div className="fl">
							<WrapColumn title={columnConfig.ad} list={columnList.ad} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.ad} />
						</div>
					</div>

					{/* happy */}
					<div className="happy clear">
						<div className="fl">
							<WrapColumn title={columnConfig.happy} list={columnList.happy} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.happy} />
						</div>
					</div>

					{/* movie */}
					<div className="movie clear">
						<div className="fl">
							<WrapColumn title={columnConfig.movie} list={columnList.movie} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.movie} />
						</div>
					</div>

					{/* teleplay */}
					<div className="teleplay clear">
						<div className="fl">
							<WrapColumn title={columnConfig.teleplay} list={columnList.teleplay} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.teleplay} />
						</div>
					</div>

					{/* cinephile */}
					<div className="cinephile clear">
						<div className="fl">
							<WrapColumn title={columnConfig.cinephile} list={columnList.cinephile} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.cinephile} />
						</div>
					</div>

					{/* documentary */}
					<div className="documentary clear">
						<div className="fl">
							<WrapColumn title={columnConfig.documentary} list={columnList.documentary} />
						</div>
						<div className="fr">
							<WrapRank list={rankList.documentary} />
						</div>
					</div>

					{/* specialRecommod */}
					{/* <div className="specialRecommod clear">
						<div className="fl">
							<WrapColumn title={columnConfig.specialRecommod} list={columnList.columnList} />
						</div>
					</div> */}
				</div>
				{/* 侧边 */}
				<SideMenu list={this.state.sideList} />
			</div>
		)
	}
}

// banner-swiper
class Swiper extends Component{
	constructor(props){
		super(props)
		this.state = {
			activedIndex: 0
		}
	}
	componentDidMount(){
		clearInterval(this.__interval);
		this._interval();
	}
	componentWillUnmount(){
		console.log('unmount');
		clearInterval(this.__interval);
	}
	_interval(){
		this.__interval = setInterval(_ => {
			let index = this.state.activedIndex;
			if(index < this.props.list.length-1){
				index += 1;
			}else{
				index = 0;
			}
			// console.log(index);
			this.setState({
				activedIndex: index
			});
		}, 4000);
	}
	stopInterval = e => {
		e.stopPropagation();
		// console.log("stop");
		clearInterval(this.__interval);
	}
	startInterval = e => {
		e.stopPropagation();
		// console.log("start");
		this._interval();
	}
	changeAcitved = e => {
		clearInterval(this.__interval);
		this.setState({
			activedIndex: +e.currentTarget.getAttribute('index')
		});
	}
	render(){
		return (
			<div
				 onMouseEnter={this.stopInterval}
				 onMouseLeave={this.startInterval}
				 className="swiper">
				<ul className="clear"
				 style={{marginLeft: `${- this.state.activedIndex*540}px`}}>
					{this.props.list.map((child, index) => (
						<li key={index}>
							<Link to={child.uri} target="_blank">
								<img src={child.src} alt="" />
								<p className={this.state.activedIndex===index ? "active" : ""}>
									<span>{child.title}</span>
								</p>
							</Link>
						</li>
					))}
				</ul>
				{/* tab */}
				<ol className="tab">
					{this.props.list.map((child, index) => (
						<li
						 onClick={this.changeAcitved}
						 className={this.state.activedIndex===index ? "active" : ""}
						 index={index}
						 key={index}>
							<i></i>
						</li>
					))}
				</ol>
			</div>
		)
	}
}

// recommend-box
class Recommend extends Component{
	constructor(props){
		super(props)
		this.state = {
			activedList: ['昨日', '三日', '一周'],
			type: ['yesterday', 'threeday', 'week'],
			activeIndex: 1,
			prevIndex: 0,
			nextIndex: 2
		}
	}
	prevRecommend = e => {
		let active = this.state.activeIndex;
		let prev = active;
		let next = active;
		if(active === 2){
			prev = 0;
		}else{
			prev += 1;
		}
		if(active === 0){
			active = 2;
		}else{
			active -= 1;
		}
		this.setState({
			activeIndex: active,
			prevIndex: prev,
			nextIndex: next
		});
	}
	nextRecommend = e => {
		let active = this.state.activeIndex;
		let prev = active;
		let next = active;
		if(active === 0){
			next = 2;
		}else{
			next -= 1;
		}
		if(active === 2){
			active = 0;
		}else{
			active += 1;
		}
		this.setState({
			activeIndex: active,
			prevIndex: prev,
			nextIndex: next
		});
	}
	render(){
		return (
			<div className="recommendBox">
				{/* tab */}
					{/* threeday */}
				<ul className="clear">
					{(this.props.list[this.state.type[this.state.activeIndex]]||[]).map((child, index) => (
						<li key={index}>
							<img src={child.pic} alt="" />
							<span>{child.title}</span>
							<div>
								<p className="title">{child.title}</p>
								<p>author：{child.author}</p>
								<p>播放量：{child.play}</p>
								<i></i>
							</div>
						</li>
					))}
				</ul>
				<div
				 onClick={this.prevRecommend}
				 className="prevList">{this.state.activedList[this.state.prevIndex]}</div>
				<div
				 onClick={this.nextRecommend}
				 className="nextList">{this.state.activedList[this.state.nextIndex]}</div>
			</div>
		)
	}
}

// banner
class Banner extends Component{
	constructor(props){
		super(props)
		this.state = {
			uri: "https://www.alice47.com",
			src: "https://www.alice47.com/img/5b614df5d48fba418fbeecbd07f3a80c.jpg",
		}
	}
	render(){
		return (
			<div className="banner">
				<Link to={this.state.uri} target="_blank">
					<img src={this.state.src} alt="" />
				</Link>
			</div>
		)
	}
}

// 侧边导航(side
class SideMenu extends Component{
	scrollAnchor = e => {
		const arr = ["", 
			"icon_animate",
			"icon_bangumi",
			"icon_bangumi_cn",
			"icon_music",
			"icon_dance",
			"icon_game",
			"icon_technology",
			"icon_life",
			"icon_kichiku",
			"icon_fashion",
			"icon_advertisement",
			"icon_happy",
			"icon_movie",
			"icon_teleplay",
			"icon_cinephile",
			"icon_documentary",
			"icon_special_recommod"];
		let i = e.target.getAttribute('name');
		let el = document.getElementsByClassName(arr[i])[0];
		el.scrollIntoView();
		this.setState({
			activeSort: +i
		});
	}
	scrollTop = _ => {
		document.getElementById("root").scrollIntoView();
		this.setState({
			activeSort: 0
		});
	}
	render(){
		return (
			<div className="sideMenu">
				<ul className="clear">
					{this.props.list.map((e, index) => (
						<li
						 key={index+1}
						 onClick={this.scrollAnchor}
						 name={e.sort}
						 className={this.props.activeSort===e.sort?"active":""}>{e.text}</li>
					))}
					{/* <li>排序</li> */}
					<li onClick={this.scrollTop}>TOP</li>
				</ul>
			</div>
		)
	}
}

const Main = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeMain)

export default Main