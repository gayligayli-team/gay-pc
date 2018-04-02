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
function mapStateToProps(state){
	return {
		recommendList: state.recommendList,
		recommendBox: state.recommendBox,
		columnConfig: state.columnConfig,
		columnList: state.columnList,
		rankList: state.rankList,
		bangumiList: state.bangumiList,
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
		updateColumnList: _ => {
			api({url:'getColumnList'})
			.then(res => {
				return dispatch({
					...action.update_column_list,
					data: res.data.list,
				})
			});
		},
		updateRankList: _ => {
			api({url:'getRankList'})
			.then(res => {
				return dispatch({
					...action.update_rank_list,
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
		updateColumnList()
		// 加载视频专栏列表
		updateRankList()
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
		console.log(columnConfig);
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
							<WrapColumn title={columnConfig.animate} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div> */}
					{/* banner */}
					<Banner />
					{/* live */}
					{/* <div className="liveBroadcast clear">
						<div className="fl">
							<WrapColumn title={this.state.dance} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>*/}

					{/* animate */}
					<div className="animate clear">
						<div className="fl">
							<WrapColumn title={columnConfig.animate} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>
					{/* bangumi */}
						{/* WrapDynamicColumn */}
						<div className="bangumi clear">
							<div className="fl">
								<WrapDynamicColumn dynamicColoumn={columnConfig.bangumiWeek} list={bangumiList} />
							</div>
							<div className="fr">
								<WrapRank list={rankList} />
							</div>
						</div>
					<div className="bangumi clear">
						<div className="fl">
							<WrapColumn title={columnConfig.bangumi} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>

					{/* bangumiCN */}
						{/* WrapDynamicColumn */}
						<div className="bangumiCN clear">
							<div className="fl">
								<WrapDynamicColumn dynamicColoumn={columnConfig.bangumiCNWeek} list={bangumiList} />
							</div>
							<div className="fr">
								<WrapRank list={rankList} />
							</div>
						</div>
					<div className="bangumiCN clear">
						<div className="fl">
							<WrapColumn title={columnConfig.bangumiCN} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>

					{/* music */}
					<div className="music clear">
						<div className="fl">
							<WrapColumn title={columnConfig.music} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>

					{/* dance */}
					<div className="dance clear">
						<div className="fl">
							<WrapColumn title={columnConfig.dance} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>

					{/* game */}
					<div className="game clear">
						<div className="fl">
							<WrapColumn title={columnConfig.game} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>

					{/* technology */}
					<div className="technology clear">
						<div className="fl">
							<WrapColumn title={columnConfig.technology} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>

					{/* life */}
					<div className="life clear">
						<div className="fl">
							<WrapColumn title={columnConfig.life} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>

					{/* kichiku */}
					<div className="kichiku clear">
						<div className="fl">
							<WrapColumn title={columnConfig.kichiku} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>

					{/* fashion */}
					<div className="fashion clear">
						<div className="fl">
							<WrapColumn title={columnConfig.fashion} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>

					{/* advertisement */}
					<div className="ad clear">
						<div className="fl">
							<WrapColumn title={columnConfig.ad} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>

					{/* happy */}
					<div className="happy clear">
						<div className="fl">
							<WrapColumn title={columnConfig.happy} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>

					{/* movie */}
					<div className="movie clear">
						<div className="fl">
							<WrapColumn title={columnConfig.movie} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>

					{/* teleplay */}
					<div className="teleplay clear">
						<div className="fl">
							<WrapColumn title={columnConfig.teleplay} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>

					{/* cinephile */}
					<div className="cinephile clear">
						<div className="fl">
							<WrapColumn title={columnConfig.cinephile} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>

					{/* documentary */}
					<div className="documentary clear">
						<div className="fl">
							<WrapColumn title={columnConfig.documentary} list={columnList} />
						</div>
						<div className="fr">
							<WrapRank list={rankList} />
						</div>
					</div>

					{/* specialRecommod */}
					<div className="specialRecommod clear">
						<div className="fl">
							<WrapColumn title={columnConfig.specialRecommod} list={columnList} />
						</div>
					</div>
				</div>
				{/* 侧边 */}
				<SideMenu />
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
					text: "动画"
				},{
					sort: 2,
					text: "番剧"
				},{
					sort: 3,
					text: "国创"
				},{
					sort: 4,
					text: "音乐"
				},{
					sort: 5,
					text: "舞蹈"
				},{
					sort: 6,
					text: "游戏"
				},{
					sort: 7,
					text: "科技"
				},{
					sort: 8,
					text: "生活"
				},{
					sort: 9,
					text: "鬼畜"
				},{
					sort: 10,
					text: "时尚"
				},{
					sort: 11,
					text: "广告"
				},{
					sort: 12,
					text: "娱乐"
				},{
					sort: 13,
					text: "电影"
				},{
					sort: 14,
					text: "TV剧"
				},{
					sort: 15,
					text: "影视"
				},{
					sort: 16,
					text: "纪录片"
				// },{
				// 	sort: -1,
				// 	text: "推荐"
				},
			],
			activeSort: 0
		}
	}
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
					{this.state.sideList.map((e, index) => (
						<li
						 key={index+1}
						 onClick={this.scrollAnchor}
						 name={e.sort}
						 className={this.state.activeSort===e.sort?"active":""}>{e.text}</li>
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