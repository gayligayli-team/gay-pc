import React, { Component } from "react"
import { Route, Switch } from 'react-router-dom'
import './../static/css/side.css'

import Header from '../components/util/navmenu'
import Footer from '../components/util/footer'
import BangumiMedia from './main/bangumi_main'




class Other extends Component{
	render(){
		return (
			<div className="home">
				{/* 首部 */}
				<Header />
					<Switch>
					{/* 番剧页 */}
						<Route exact path="/bangumi/:bid" component={BangumiMedia} />
					</Switch>
					{this.props.children}
				{/* 尾部 */}
				<Footer />
			</div>
		)
	}
}


export default Other