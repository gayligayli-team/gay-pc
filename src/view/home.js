import React, { Component } from "react"
import { Route, Switch, Redirect } from 'react-router-dom'
import './../static/css/side.css'

import Header from '../components/util/header'
import Footer from '../components/util/footer'
import Menu from '../components/util/menu'

import HomeMain from './main/home_main'
import VideoRoom from './main/video_main'

// 404
import NotFound from './../view/404'

class Home extends Component{
	render(){
		return (
			<div className="home">
				{/* 首部 */}
				<Header />
					{/* 菜单 */}
					<Menu />
					{/* 内容 */}
					{/* <Main /> */}
					<Switch>
						{/* 首页 */}
							<Route exact path="/" component={HomeMain} />
						{/* 视频页 */}
							<Route exact path="/video/:avid" component={VideoRoom} />
						{/* 番剧页 */}

						{/* 异常页 */}
						<Route path='/404' component={NotFound} />
						<Redirect from='*' to='/404' />

					</Switch>
					{this.props.children}
				{/* 尾部 */}
				<Footer />
			</div>
		)
	}
}


export default Home