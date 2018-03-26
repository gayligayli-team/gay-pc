import React, { Component } from "react"
import './../../static/css/video.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import api from './../../api/fetch'
import action from './../../api/action'


// component
import Play from '../../components/home/videoplay'


// mapStateToProps
function mapStateToProps(state){
	return {
		videoDetail: state.videoDetail,
	}
}

// mapDispatchToProps
function mapDispatchToProps(dispatch){
	return {
		updateVideoInfo: _ => {
			api({
				url: 'video/queryVideoDetail',
				data: {
					avid: 1
				}
			})
			.then(res => {
				console.log(res);
				return dispatch({
					...action.update_video_info,
					data: res.data,
				})
			})
		},
	}
}



class VideoRoomUI extends Component{
	// constructor(props){
	// 	super(props)
	// }
	componentDidMount(){
		const {
			updateVideoInfo
		} = this.props;
		updateVideoInfo();
	}
	createtime = e => {
		if(!e)return "";
		const time = new Date(e*1000);
		let _y = time.getFullYear();
		let _m = time.getMonth()+1;
		let _d = time.getDate();
		let _h = time.getHours();
		let _min = time.getMinutes();
		let _time = _y+"-"+(_m<10?"0"+_m:_m)+"-"+(_d<10?"0"+_d:_d)+" "+(_h<10?"0"+_h:_h)+":"+(_min<10?"0"+_min:_min);
		return _time;
	}
	render(){
		const {
			videoDetail,
		} = this.props;
		return (
			<div className="main_video">
				<div className="title clear">
					{/* 视频信息 */}
					<div className="video_info fl">
						<h1>{videoDetail.title}</h1>
						<div className="correlate">
							<span className="video_type">
								<Link to="/">主页</Link>&nbsp;&gt;&nbsp;<Link to="/">生活</Link>&nbsp;&gt;&nbsp;<Link to="/">日常</Link>
							</span>
							<span className="vodeo_create_time">{this.createtime(videoDetail.create_unix)}</span>
							<span className="complaint"><Link to="/">稿件投诉</Link></span>
						</div>
						<div className="count">
							<p>
								<span className="icon_play">{videoDetail.play}</span>
								<span className="icon_danmaku">{videoDetail.danmaku}</span>
								<span className={`${videoDetail.name===-1?"icon_rank":"non_rank"}`}>{videoDetail.rank}</span>
							</p>
							<p>
								<span className="icon_coins">{videoDetail.coins}</span>
								<span className="icon_favorites">{videoDetail.favorites}</span>
							</p>
						</div>
					</div>
					{/* 投稿者信息 */}
					<div className="author_info fr clear">
						<div className="pic fl">
							<img src={videoDetail.face} alt={videoDetail.name} />
						</div>
						<div className="info fl">
							<p className="clear">
								<span className="name fl">{videoDetail.name}</span>
								<span className="icon_send_msg fr">发消息</span>
							</p>
							<p className="desc">{videoDetail.motto}</p>
							<p className="count">
								<span className="archive">投稿：{videoDetail.archive_count}</span>
								<span className="fans">粉丝：{videoDetail.fans}</span>
							</p>
							<p>
								<span className="follow">+ 关注</span>
								<span className="support">充电</span>{/* (支持) */}
							</p>
						</div>
					</div>
				</div>
				<div className="play">
					<Play {...this.props} />
					<div className="tools clear">
						<ul className="share clear">
							<li>分享<i className="icon_arrow_down"></i><div className="layer">
								
							</div>
							</li>
							<li className="icon_share_video"></li>
							<li className="icon_share_webo"></li>
							<li className="icon_share_qzone"></li>
							<li className="icon_share_qq"></li>
							<li className="icon_share_tie"></li>
						</ul>
						<div className="favorites">
							<i></i>
							<p>
								<span>收藏</span>
								<span>999</span>
							</p>
						</div>
						<div className="coins">
							<i></i>
							<p>
								<span>硬币</span>
								<span>999</span>
							</p>
						</div>
						<div className="watchlater">
							<i></i>
							<p>
								<span>稍后看</span>
								<span>make~</span>
							</p>
						</div>
						<div className="forapp">
							<i></i>
						</div>
						<div className="support"></div>
					</div>
				</div>
				{/*
				<div className="inner">
					<div className="innerbox">
					</div>
				</div>
				*/}
			</div>
		)
	}
}






const VideoRoom = connect(
	mapStateToProps,
	mapDispatchToProps,
)(VideoRoomUI)

export default VideoRoom
