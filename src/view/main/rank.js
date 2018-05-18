import React, { Component } from "react"
import './../../static/css/rank.css'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import api from './../../api/fetch'
import action from './../../api/action'


// component



// mapStateToProps
const mapStateToProps = state => {
	return {
		...state.rank
	}
}

// mapDispatchToProps
function mapDispatchToProps(dispatch){
	return {
		queryRankList: type => {
			api({
				url:'ranking',
				data: {
					type
				}
			})
			.then(res => {
				return dispatch({
					...action.update_ranking,
					data: res.data.list
				})
			})
		},
	}
}


// 内容
class RankMain extends Component{
	componentDidMount(){
		let arr = ['/ranking/all', '/ranking/origin', '/ranking/bangumi', '/ranking/cinema', '/ranking/rookie'];
		let n = arr.indexOf(this.props.location.pathname)+1;
		const {
			queryRankList
		} = this.props
		// 加载列表
		queryRankList(n);
	}
	render(){
		return (
			<div>
				<div className="main">
					{/* rank-nav */}
					<div className="rank_menu">
						<Link to='/ranking/all' className={this.props.location.pathname==='/ranking/all'?"active":""}>全站榜</Link>
						<Link to='/ranking/origin' className={this.props.location.pathname==='/ranking/origin'?"active":""}>原创榜</Link>
						<Link to='/ranking/bangumi' className={this.props.location.pathname==='/ranking/bangumi'?"active":""}>新番榜</Link>
						<Link to='/ranking/cinema' className={this.props.location.pathname==='/ranking/cinema'?"active":""}>影视榜</Link>
						<Link to='/ranking/rookie' className={this.props.location.pathname==='/ranking/rookie'?"active":""}>新人榜</Link>
					</div>
					{/* rank-list */}
					<Switch>
						<Redirect exact from='/ranking' to='/ranking/all' />
						{/* 全站排名 */}
						<Route exact path="/ranking/all" component={CommonRankList} />
						{/* 原创排名 */}
						<Route exact path="/ranking/origin" component={CommonRankList} />
						{/* 番剧排名 */}
						<Route exact path="/ranking/bangumi" component={CommonRankList} />
						{/* 影视排名 */}
						<Route exact path="/ranking/cinema" component={CommonRankList} />
						{/* 新人排名 */}
						<Route exact path="/ranking/rookie" component={CommonRankList} />
					</Switch>
					{/* scroll-top */}
					<SideMenu />
				</div>
			</div>
		)
	}
}

/*// 全站榜
class AllRank extends Component{
	render(){
		return (
			<div>
				<CommonRankList />
			</div>
		)
	}
}

// 原创榜
class NativeRank extends Component{
	render(){
		return (
			<div>
				NativeRank：原创榜
			</div>
		)
	}
}

// 新番榜
class BangumiRank extends Component{
	render(){
		return (
			<div>
				BangumiRank：新番榜
			</div>
		)
	}
}

// 影视榜
class CinemaRank extends Component{
	render(){
		return (
			<div>
				CinemaRank：影视榜
			</div>
		)
	}
}

// 新人榜
class RookieRank extends Component{
	render(){
		return (
			<div>
				RookieRank：新人榜
			</div>
		)
	}
}*/

// 排行列表
class CommonRankList extends Component{
	constructor(props){
		super(props)
		this.state = {
			tag: ["全部", "动画", "国创", "音乐", "舞蹈", "游戏", "科技", "生活", "鬼畜", "时尚", "娱乐", "影视"],
			list: [],
			active_tag: 0,
			active_type: 0,
		}
	}
	componentDidMount(){
		let arr = ['/ranking/all', '/ranking/origin', '/ranking/bangumi', '/ranking/cinema', '/ranking/rookie'];
		let active_type = arr.indexOf(this.props.location.pathname)+1;
		this.setState({
			active_type,
		});
		this.queryRankList({
			type: active_type,
			tagId: this.state.active_tag,
		});
	}
	changeTag = e => {
		if(e.target.getAttribute('class')==='active')return;
		let _index = +e.currentTarget.getAttribute('index');
		this.setState({
			active_tag: _index,
		});
		this.queryRankList({
			type: this.state.active_type,
			tagId: _index,
		});
	}
	queryRankList = ({type, tagId}) =>{
		api({
			url:'ranking',
			data: {
				type,
				tagId,
			}
		})
		.then(res => {
			if(res.result === 0){
				let list = res.data.list;
				this.setState({
					list,
				});
			}else{
				console.warn(res);
			}
		}).catch(err => {
			console.log(err);
		});
	}
	render(){
		return (
			<div className="rankList">
				{/* RankList-tag */}
				<ul className="rank_tag">
					{this.state.tag.map((child, index) => (
						<li className={this.state.active_tag===index?'active':''}
						 key={index}
						 index={index}
						 onClick={this.changeTag}>
						{child}
						</li>
					))}
				</ul>
				{/* RankList-list */}
				<ul className="rank_list">
					{this.state.list.map((child, index) => (
						<li className="clear" key={index}>
							<div className='fl clear'>
								<div className='rank_index'>{index+1}</div>
								<div className='rank_img'>
									<img src={child.src} alt='' />
								</div>
								<div className='rank_text'>
									<p className='rank_tit'>{child.name}</p>
									<p className='rank_info'>
										<span className='icon_play'>{child.author_id}</span>
										<span className='icon_danmaku'>{child.author_id}</span>
										<span className='icon_author'>{child.author_id}</span>
									</p>
								</div>
							</div>
							<div className='fr'>
								<p className='rank_pts'>{child.author_id}</p>
								<p>综合评分</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		)
	}
}



// 侧栏(side
class SideMenu extends Component{
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
					<li onClick={this.scrollTop}>TOP</li>
				</ul>
			</div>
		)
	}
}


const RankList = connect(
	mapStateToProps,
	mapDispatchToProps
)(RankMain)

export default RankList