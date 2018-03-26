import React, { Component } from "react"
import { Link } from 'react-router-dom'

import NavMenu from './navmenu'

// 首部通用
class Header extends Component {
	render(){
		return (
			<div className="header">
				<NavMenu />
				<div className="navMenuBg"></div>
				<div className="navSearchBox">
					<Search />
				</div>
			</div>
		)
	}
}

// 搜索
class Search extends Component {
	constructor(props){
		super(props)
		this.state = {
			searchText: "搜索内容"
		}
	}
	render(){
		return (
			<div className="navSearch">
				<Link to="/ranking">
					<button>排行榜</button>
				</Link>
				<label>
					<input type="text" name="search" placeholder={this.state.searchText} />
					<Link to="/search">
						<i></i>
					</Link>
				</label>
			</div>
		)
	}
}

export default Header