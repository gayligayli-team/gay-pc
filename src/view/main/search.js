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
			searchKey: {
				type: "text",
				name: "search_key",
				placeholder: "",
				value: '',
				width: 320,
			},
			searchBtn: {
				title: "搜索",
				width: 90,
			},
			list: [],
		}
	}
	componentDidMount(){
		// const {} = this.props
		// 加载列表
		this.querySearchList();
	}
	searchKeyChange = e => {
		this.setState({
			searchKey: {
				...this.state.searchKey,
				value: e.target.value,
			}
		})
	}
	// 搜索
	searchSubmit = _ => {
		console.log("搜索")
	}
	querySearchList = () =>{
		api({
			url: 'search',
			data: {
				pageIndex: 0,
				pageSize: 30,
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
					<div className="clear">
						<Input {...this.state.searchKey} changeValue={this.searchKeyChange} />
						<Button {...this.state.searchBtn} click={this.searchSubmit} />
					</div>
					{/* search-type */}
					{/* search-list */}
					<ul className="search_list clear">
						{this.state.list.map((child, index) =>(
							<li className="clear" key={index}>
								<div className="cover">
									<img src={child.pic} alt='' />
									<span className="">{child.duration}</span>
								</div>
								<div className="info">
									<p className="title">{child.title}</p>
									<p className="clear">
										<span className="fl">{child.play}</span>
										<span className="fr">{child.senddate}</span>
									</p>
									<p>{child.author}</p>
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