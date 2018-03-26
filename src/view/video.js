import React, { Component } from "react"


import Header from '../components/util/header'
import Footer from '../components/util/footer'
import Menu from '../components/util/menu'
import VideoRoom from './main/video_main'

class Video extends Component{
	// constructor(props){
	// 	super(props)
	// }
	render(){
		return (
			<div className="home">
				{/* 首部 */}
				<Header />
					{/* 菜单 */}
					<Menu />
					{/* video */}
					<VideoRoom {...this.props} />
				{/* 尾部 */}
				<Footer />
			</div>
		)
	}
}

export default Video