import React, { Component } from "react"
import './../../static/css/bangumi.css'
import { connect } from 'react-redux'
import api from './../../api/fetch'


// component
import {
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
class BangumiMain extends Component{
	constructor(props){
		super(props)
		this.state = {
			bangumi_tag: [
				'搞笑',
				'古风',
				'泡面',
				'漫改',
			],
			menu: [
				'作品详情',
				'长评',
				'短评',
				'相关视频',
			],
			score: 9.5,
		}
	}
	componentDidMount(){
		// const {} = this.props
		// 加载
	}
	render(){
		return (
			<div>
				<div className="bangumi_nav clear">
					<div className="fl">
						<img src="" alt="" />
					</div>
					<div className="fl">
						<p className="title">
							<span>title</span>
							{this.state.bangumi_tag.map((child, index) => (
								<span className=""
									 index={index}
									 key={index}>{child}</span>
							))}
						</p>
						<p className="title">
							<span>
								<em>总播放</em>
								<em>x万</em>
							</span>
							<span>
								<em>追番人数</em>
								<em>x万</em>
							</span>
							<span>
								<em>弹幕总数</em>
								<em>x万</em>
							</span>
						</p>
						<p className="title">
							<span>20xx年x月x日 开播</span>
							<span>连载中, 每周三、周六xx:xx更新</span>
						</p>
						<p>简介：【支付</p>
						<p>
							{/*<Button {...this.state.style} click={this.btn} />*/}
						</p>
						<div>
							<p>
								<span>{this.state.score}</span>
								{[1,2,3,4,5].map((child, index) => (
									<i className=""
										 index={index}
										 key={index}></i>
								))}
							</p>
							<p className="comment">
								<span>xx人评</span>|
								<span><em>点评一下</em><i></i></span>
							</p>
						</div>
					</div>
				</div>
				<div className="bangumi_menu">
					<ul>
						{this.state.menu.map((child, index) => (
							<li className=""
								 index={index}
								 key={index}
								 onClick={this.changeParamsTime}>{child}</li>
						))}
					</ul>
				</div>
				<div className="bangumi_main clear">
					<div className="fl"></div>
					<div className="fr"></div>
				</div>
			</div>
		)
	}
}





const Bangumi = connect(
	mapStateToProps,
	mapDispatchToProps
)(BangumiMain)

export default Bangumi