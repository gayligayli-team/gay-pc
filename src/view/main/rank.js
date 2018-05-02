import React, { Component } from "react"
import './../../static/css/rank.css'
import { Route, Switch, Link } from 'react-router-dom'
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
		const {
			// rankingList
		} = this.props
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
						<Route exact path="/ranking" component={AllRank} />
						{/* 全站排名 */}
						<Route exact path="/ranking/all" component={AllRank} />
						{/* 原创排名 */}
						<Route exact path="/ranking/origin" component={NativeRank} />
						{/* 番剧排名 */}
						<Route exact path="/ranking/bangumi" component={BangumiRank} />
						{/* 影视排名 */}
						<Route exact path="/ranking/cinema" component={CinemaRank} />
						{/* 新人排名 */}
						<Route exact path="/ranking/rookie" component={RookieRank} />
					</Switch>
					{/* scroll-top */}
					<SideMenu />
				</div>
			</div>
		)
	}
}

// 全站榜
class AllRank extends Component{
	render(){
		return (
			<div>
				NativeRank：全站榜
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