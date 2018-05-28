import React, { Component } from "react"
import './../../static/css/search.css'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import api from './../../api/fetch'
// import action from './../../api/action'


// component
import {
	Input,
	Button,
} from '../../components/util/from'


// mapStateToProps
const mapStateToProps = state => {
	return {
		// ...state.search
	}
}

// mapDispatchToProps
function mapDispatchToProps(dispatch){
	return {
	}
}


// 内容
class SearchMain extends Component{
	constructor(props){
		super(props)
		this.state = {
			menuList: ['综合', '视频', '番剧', '影视', '直播', '专栏', '话题', '用户', '相簿'],
			searchParamsSort: ['综合排序', '最多点击', '最新发布', '最多弹幕', '最多收藏'],
			searchParamsTime: ['全部时长', '10分钟以下', '10-30分钟', '30-60分钟', '60分钟以上'],
			searchParamsType: ['全部分区', '动画', '番剧', '国创', '音乐', '舞蹈', '游戏', '科技', '生活', '鬼畜', '时尚', '广告', '娱乐', '影视', '纪录片', '电影', '电视剧'],
			list: [],
			active_type: 0,
			active_params_sort: 0,
			active_params_time: 0,
			active_params_type: 0,
			searchKey: {
				type: "text",
				name: "search_key",
				placeholder: "",
				value: '',
				width: 320,
				css: 'search_input'
			},
			searchBtn: {
				title: "搜索",
				width: 90,
			},
			list_dense_status: true,
			params_more_status: false,
		}
	}
	componentDidMount(){
		// const {} = this.props
		// 加载列表
		this.querySearchList();
	}
	changeType = e => {
		if(e.target.getAttribute('class')==='active')return;
		let _index = +e.currentTarget.getAttribute('index');
		this.setState({
			active_type: _index,
		});
		/*this.queryRankList({
			type: this.state.active_ttype,
			tagId: _index,
		});*/
	}
	changeParamsSort = e => {
		if(e.target.getAttribute('class')==='active')return;
		let _index = +e.currentTarget.getAttribute('index');
		this.setState({
			active_params_sort: _index,
		});
	}
	changeParamsTime = e => {
		if(e.target.getAttribute('class')==='active')return;
		let _index = +e.currentTarget.getAttribute('index');
		this.setState({
			active_params_time: _index,
		});
	}
	changeParamsType = e => {
		if(e.target.getAttribute('class')==='active')return;
		let _index = +e.currentTarget.getAttribute('index');
		this.setState({
			active_params_type: _index,
		});
	}
	searchKeyChange = e => {
		this.setState({
			searchKey: {
				...this.state.searchKey,
				value: e.target.value,
			}
		})
	}
	// 切换详情&简要
	changeParamsMore = _ => {
		this.setState({
			params_more_status: !this.state.params_more_status,
		});
	}
	changeListDense = e => {
		if(e.target.getAttribute('class')==='active')return;
		let list_dense_status = !+e.currentTarget.getAttribute('index');
		this.setState({
			list_dense_status,
		});
	}
	// 搜索
	searchSubmit = _ => {
		this.querySearchList(this.state.searchKey.value);
	}
	querySearchList = key =>{
		api({
			url: 'search',
			data: {
				pageIndex: 0,
				pageSize: 30,
				key,
			}
		})
		.then(res => {
			if(res.result === 0){
				let list = res.data.list;
				console.log(list);
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
		// const {} = this.props
		return (
			<div>
				<div className="main">
					{/* search-input */}
					<div className="search_wrap clear">
						<div className="search_box">
							<Input {...this.state.searchKey} changeValue={this.searchKeyChange} />
							<Button {...this.state.searchBtn} click={this.searchSubmit} />
						</div>
					</div>
					{/* search-type */}
					<ul className="search_type clear">
						{this.state.menuList.map((child, index) => (
							<li className={this.state.active_type===index?" active":""}
							 index={index}
							 key={index}
							 onClick={this.changeType}>{child}</li>
						))}
					</ul>
					<div className={`${this.state.params_more_status?"params_more ":""}type_select`}>
						<div className="dense_type">
							{['dense', 'sparse'].map((child, index) => (
								<i onClick={this.changeListDense}
								 index={index}
								 key={index}
								 className={this.state.list_dense_status===!!index?`icon_${child}`:`icon_${child}_active`}></i>
							))}
							{/*<span className={this.state.list_dense_status?"active":""}>井</span>
							<span className={this.state.list_dense_status?"":"active"}>三</span>*/}
						</div>
						<div onClick={this.changeParamsMore}
							 className={`${this.state.params_more_status?"point_more ":""}params_point`}>
							{`${this.state.params_more_status?'更少筛选↑':'更多筛选↓'}`}
						</div>
						<div className="search_count">共1000+条数据</div>
						<ul className={`${this.state.params_more_status?"":"hidden_more "}clear`}>
							{this.state.searchParamsSort.map((child, index) => (
								<li className={this.state.active_params_sort===index?" active":""}
								 index={index}
								 key={index}
								 onClick={this.changeParamsSort}>{child}</li>
							))}
						</ul>
						<ul className="clear">
							{this.state.searchParamsTime.map((child, index) => (
								<li className={this.state.active_params_time===index?" active":""}
								 index={index}
								 key={index}
								 onClick={this.changeParamsTime}>{child}</li>
							))}
						</ul>
						<ul className="clear">
							{this.state.searchParamsType.map((child, index) => (
								<li className={this.state.active_params_type===index?" active":""}
								 index={index}
								 key={index}
								 onClick={this.changeParamsType}>{child}</li>
							))}
						</ul>
					</div>
					{/* search-list */}
					<ul className={this.state.list_dense_status?"dense_list clear":"sparse_list"}>
						{this.state.list.map((child, index) => (
							<li className="clear" key={index}>
								<div className="cover">
									<img src={child.pic} alt='' />
									<span className="">{child.duration}</span>
								</div>
								<div className="info">
									<p className="title">{child.title}</p>
									<p className="clear">
										<span className="info_play">{child.play}</span>
										<span className="info_senddate">{child.senddate}</span>
									</p>
									<p className="info_author">{child.author}</p>
								</div>
							</li>
						))}
					</ul>
					{/* scroll-top */}
					<SideMenu />
				</div>
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


const Search = connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchMain)

export default Search