import React, { Component } from "react"
import './../../static/css/videoplay.css'
// import io from 'socket.io-client'
// import ss from 'socket.io-stream'

import event from './../../api/event.js'
import video from './../../api/video.js'
// import api from './../../api/fetch.js'

import Dangumi from './dangumi'

class Play extends Component{
	constructor(props){
		super(props)
		this.state = {
			playing: 0,
			playtime: 0,
			palytime_start: 0,
			palytime_max: 0,
			volume: 100,
			audioShow: false,
			muted: 0,
			clarity: 0,
			bangumi: 1,
			loop: 0,
			widescreen: 0,
			fullscreen: 0,
				screenWidth: null,
			loadingVal: 0,
			playingVal: 0,
			file: "",

			popupLayerShow: false,
			popupLayerTop: 0,
			popupLayerLeft: 0,
			rate: 1,
			ratio: 1,
			reverse: 0,
			rateList: [0.5, 0.75, 1, 1.25, 1.5, 1.75],
			ratioList: ["默认", "4:3", "16:9"],
			bgHideLayer: false,
		}
		event.add(window, 'resize', this.changeScreenResize);
	}
	// life-cycle
	componentDidMount(){
		// video bind Vdom
		video.init(this.refs.video);
		// WebSocket --> content
		// this.webscoket = io.connect("http://127.0.0.1:8888");
		// this.queryVideo();			// socket query Video(Buffer) => blob => MSE => HttpBlob
		// this.getVideo();			// 监听视频加载

		// this.loading();			// fetch  加载  video(File)   => blob => MSE => HttpBlob
		// 进度条缓冲(伪
		// this.loadStart();
	}
	componentWillReceiveProps(props){
		this.loading(props.videoDetail.videoDetail.source);
		this.loadStart();
	}
	componentWillUnmount(){
		// console.warn('unmount');
		clearTimeout(this.loadClear);
		clearTimeout(this.playClear);
	}
	// methods
	videoplay = _ => {
		let play_status = this.state.playing?0:1;
		play_status?video.play():video.stop();
		play_status?this.playStart():clearTimeout(this.playClear);
		if(this.state.palytime_start>=this.state.palytime_max){
			// replay
			this.setState({
				playtime: 0,
				palytime_start: 0,
				playingVal: 0,
				playing: play_status
			});
			// console.warn("replay");
		}else{
			// toggle
			this.setState({
				playing: play_status
			});
			// console.warn("toggle");
		}
	}
	progressStart = e => {
		e.stopPropagation();
		e.preventDefault();
		// 清除bar
		clearTimeout(this.playClear);
		video.getSeekState();
		// 当前X轴偏移
		this.progressPos = e.clientX;
		this.sliderPos = e.clientX-e.currentTarget.getBoundingClientRect().left;
		// 当前进度
		// console.log(e.clientX, e.currentTarget.getBoundingClientRect().left);
		// 总进度
		// console.log(this.refs.bar.clientWidth);
		// let _val = (e.clientX-e.currentTarget.getBoundingClientRect().left)/ this.refs.bar.clientWidth * 100;
		this.progressMove(e);
		event.add(document, 'mousemove', this.progressMove);
		event.add(document, 'mouseup', this.progressEnd);
	}
	progressMove = e => {
		let _val = this.sliderPos + e.clientX - this.progressPos;
		let changeVal = Math.max(Math.min(_val, this.refs.bar.clientWidth), 0)/ this.refs.bar.clientWidth * 100;
		let time = this.state.palytime_max*changeVal/100;
		this.setState({
			palytime_start: time,
			playingVal: changeVal
		});
	}
	progressEnd = e => {
		// 可播放
		if(this.state.palytime_start<=this.state.palytime_max||this.state.loop){
			this.setState({
				playtime: this.state.palytime_start,
				playing: 1
			});
			this.playStart();
			video.play();
			video.setTime(this.state.palytime_start);
		}
		event.remove(document, 'mousemove', this.progressMove);
		event.remove(document, 'mouseup', this.progressEnd);
	}

	volumeStart = e => {
		e.stopPropagation();
		e.preventDefault();
		// 当前y轴偏移
		this.aduioPos = e.clientY;
		this.volumePos = e.clientY-e.currentTarget.getBoundingClientRect().top;
		this.volumeMove(e);
		this.setState({
			audioShow: true
		});

		event.add(document, 'mousemove', this.volumeMove);
		event.add(document, 'mouseup', this.volumeEnd);
	}
	volumeMove = e => {
		let volumeVal = Math.max(Math.min(this.volumePos + e.clientY - this.aduioPos, this.refs.volume.clientHeight), 0);
		let volume = 100 - Math.floor(volumeVal?volumeVal / this.refs.volume.clientHeight * 100:0);

		volume&&video.mute(0);
		video.setVolume(volume);
		this.setState({
			volume,
			muted: !volume?1:0
		});
	}
	volumeEnd = e => {
		// 可播放
		this.setState({
			audioShow: false
		});

		event.remove(document, 'mousemove', this.volumeMove);
		event.remove(document, 'mouseup', this.volumeEnd);
	}

	changeMute = _ => {
		let muted = this.state.muted?0:1;
		video.mute(muted);
		this.setState({
			muted
		});
		if(!muted&&!this.state.volume){
			video.setVolume(10);
			this.setState({
				volume: 10
			});
		}
	}
	changeClarity = _ => {
	}
	changeBangumi = _ => {
		this.setState({
			bangumi: this.state.bangumi?0:1
		});
	}
	changeLoop = _ => {
		this.setState({
			loop: this.state.loop?0:1
		});
	}
	changeWidescreen = _ => {
		!this.state.fullscreen&&this.setState({
			widescreen: this.state.widescreen?0:1
		});
		console.warn(this.state.widescreen);
	}
	changeFullscreen = _ => {
		let fullscreen = this.state.fullscreen?0:1;
		this.setState({
			fullscreen,
			widescreen: 0
		});
		fullscreen?video.fullscreen(this.cancelFullscreen):video.cancelscreen(this.cancelFullscreen);
	}
	changeScreenResize = _ => {
		// console.log(this.state.fullscreen, window.innerWidth);
		if(!this.state.fullscreen)return;
		this.setState({
			screenWidth: window.innerWidth
		});
	}
	// Esc 退出全屏
	cancelFullscreen = _ => {
		let _fullscreen = document.webkitIsFullScreen ||
			 document.msFullscreenEnabled ||
			 document.fullscreenEnabled ||
			 window.fullScreen;
		!_fullscreen&&this.setState({
			fullscreen: 0
		});
		console.warn("change", _fullscreen, this.state.fullscreen);
	}

	playStart = _ => {
		clearTimeout(this.playClear);
		this.playClear = setTimeout(_ => {
			if(this.state.playing===0)return;
			let _time = video.time();
			// let time = this.state.palytime_start+.1;
			// let progress = Math.min(this.state.playingVal+1/this.state.palytime_max*10, 100);

			// 播放结束
			if(_time>=this.state.palytime_max&&this.state.loop){
				video.stop();
				this.setState({
					palytime_start: this.state.palytime_max,
					playingVal: 100
				});
				setTimeout(_ => {
					this.setState({
						palytime_start: 0,
						playingVal: 0
					});
					this.playStart();
					video.play();
				}, 200);
				return;
			}else if(_time>=this.state.palytime_max&&!this.state.loop){
				this.setState({
					palytime_start: _time,
					playing: 0
				});
			}
			// 循环
			this.setState({
				palytime_start: _time,
				playingVal:  Math.min(_time*100/this.state.palytime_max, 100)
			});
			this.playStart();
		}, 100);
	}
	loadStart = _ => {
		clearTimeout(this.loadClear);
		this.loadClear = setTimeout(_ => {
			// 播放结束
			if(this.state.loadingVal>=100)return;
			let loadingVal = Math.min(this.state.loadingVal+1, 100);
			this.setState({
				loadingVal
			});
			// 
			this.loadStart();
		}, 100);
	}
	getVideo = _ => {
		this.webscoket.on('getVideo', data => {
			let blob=new Blob([data]);
			// Blob => URL-String
			let url = URL.createObjectURL(blob);
			this.setState({
				file: url
			});
			this.videoReady();
		});
		this.webscoket.on('errorVideo', json => {
			console.error(json);
		});
	}
	queryVideo = _ => {
		this.webscoket.emit('queryVideo', this.props.match.params);
	}
	loading = file => {
		// fetch("https://www.alice47.com/video/0.mp4")
		fetch(file)
		.then(response => {
			return response.blob()
		}).then(json => {
			let blob = new Blob([json]);
			// Blob => URL-String
			let url = URL.createObjectURL(blob);
			this.setState({
				file: url
			});
			this.videoReady();
		}).catch(err => {
			console.log(err);
		});
	}
	videoReady = _ => {
		let v = this.refs.video;
		this.inter = setInterval(_ => {
			let vState = v.readyState;
			if(v.played.length){
				console.warn(v.played, v.played.start(0), v.played.end(0), "首段已播放？");
			}
			if(v.buffered.length){
				console.warn(v.buffered, v.buffered.start(0), v.buffered.end(0), "视频缓冲区域");
			}
			if(!!v.duration){
				console.warn(v.duration, "sec, 无限:infinitely");
			}
			console.warn(v.networkState, "网络状态,(1:加载完毕,可离线, 2:加载中, 3:视频源不识别");
			console.warn(v.readyState, "视频加载状态(0:无法监听视频就绪, 1:视频源就绪, 4:ok");
			if(vState===4){
				clearInterval(this.inter);
				this.setState({
					palytime_max: v.duration
				});
			}
			if(v.networkState===3){
				clearInterval(this.inter);
				console.error("视频源不识别");
			}
		}, 100);
	}
	videoShieldIn = _ => {
		// console.log("videoIn");
		event.add(document, 'contextmenu', this.stopRightClick);
	}
	videoShieldOut = _ => {
		// console.log("videoOut");
		event.remove(document, 'contextmenu', this.stopRightClick);
	}
	popupLayer = e => {
		if(e.button === 2){
			let popupLayerLeft = e.clientX-e.currentTarget.getBoundingClientRect().left+3;
			let popupLayerTop = e.clientY-e.currentTarget.getBoundingClientRect().top+3;
			this.setState({
				popupLayerShow: true,
				popupLayerTop,
				popupLayerLeft,
			});
		}else if(e.button === 0){
			this.videoplay();
			this.setState({
				popupLayerShow: false
			});
		}else{

		}
		console.warn("popupLayer");
	}
	stopRightClick = e => {
		e.preventDefault();
	}
	videoReverse = _ => {
		this.setState({
			popupLayerShow: false,
			reverse: this.state.reverse?0:1
		});
	}
	videoRate = e => {
		let rate = +e.target.getAttribute("k");
		if(rate===this.state.rate)return;
		video.setRate(rate);
		this.setState({
			popupLayerShow: false,
			rate,
		});
	}
	videoRatio = e => {
		let ratio = +e.target.getAttribute("k")+1;
		if(ratio===this.state.ratio)return;
		console.log(ratio);
		if(ratio===2){
		}else if(ratio===3){
		}else{
		}
		this.setState({
			popupLayerShow: false,
			ratio,
		});
	}
	changeBgColor = _ => {
		this.setState({
			popupLayerShow: false,
			bgHideLayer: !this.state.bgHideLayer,
		});
	}
	timeToString = unix => {
		unix = Math.floor(unix);
		let _sec = unix%60||0;
		let _min = (unix-_sec)/60||0;
		_min = _min>9?_min:("0"+_min);
		_sec = _sec>9?_sec:("0"+_sec);
		return _min+':'+_sec;
	}
	render(){
		return (
			<div className={`${this.state.widescreen?"video_widescreen ":""}play_content clear`}>
				<div className={`${this.state.fullscreen?"fullscreen ":""}video_box`}>
					{/* 公告 */}
					<div className="paly_video_notice">
						<span className="fl">&lt;</span>
						<span className="fr">&gt;</span>
						<div className="paly_notice_button">测试公告</div>
					</div>
					{/* 视频主体 */}
					<div 
						onMouseEnter={this.videoShieldIn}
						onMouseLeave={this.videoShieldOut}
						style={{zIndex: this.state.fullscreen?"100":""}}
						className={`${this.state.reverse?"reverse ":""}${this.state.ratio===2?"endwise ":""}paly_video_main`}>
						<div
							style={{top: this.state.popupLayerTop+"px", left: this.state.popupLayerLeft+"px"}}
							className={`${this.state.popupLayerShow?"active ":""}popupLayer`}>
							<ul>
								<li className="option">
									<span>播放速度</span>
									<p className="clear">
										{this.state.rateList.map((child, index) => (
											<em
											onClick={this.videoRate}
											k={child}
											key={index}
											className={`${this.state.rate===child?"active":""}`}>{child===1?"正常":child}</em>
										))}
									</p>
								</li>
								<li className="option">
									<span>画面比例</span>
									<p className="clear">
										{this.state.ratioList.map((child, index) => (
											<em
											onClick={this.videoRatio}
											k={index}
											key={index}
											className={`${this.state.ratio===index+1?"active":""}`}>{child}</em>
										))}
									</p>
								</li>
								<li onClick={this.changeBgColor}>{this.state.bgHideLayer?"开灯":"关灯"}</li>
								<li onClick={this.videoReverse} className={`${this.state.reverse?"active ":""}`}>镜像</li>
								<li>功能更新记录</li>
								<li>视频统计技能</li>
							</ul>
						</div>
						<i
							onMouseDown={this.popupLayer}
							className="video_playing"></i>
						<video
							style={{width: this.state.ratio===2?"87.2873%":"",height: this.state.ratio===2?"100%":""}}
							ref="video" src={this.state.file} />
					</div>
					{/* 播放控制 */}
					<div
						style={{display: this.state.fullscreen&&(window.innerWidth<480)?"none":""}}
						className={`${this.state.widescreen?"widescreen ":""}paly_video_control clear`}>
						<i onClick={this.videoplay} className={this.state.playing?"icon_play_stop":"icon_play_start"}></i>
						{/* <i onClick={} className="icon_play_next"></i> */}
						<div
							style={{width: this.state.fullscreen?(window.innerWidth-330+"px"):""}}
							className="bar_box">
							<div
								onMouseDown={this.progressStart}
								ref="bar"
								style={{width: this.state.fullscreen?(window.innerWidth-340+"px"):""}}
								className="bar">
								{/* 总进度条 */}
								<div className="line">
									{/* 加载进度 */}
									<span
									style={{width: this.state.loadingVal + "%"}}
									className="line_loading"></span>
									{/* 播放进度*/}
									<span
									style={{width: this.state.playingVal + "%"}}
									className="line_playing">
										<u></u>
									</span>
								</div>
							</div>
						</div>
						<span className="play_time">{this.timeToString(this.state.palytime_start)} / {this.timeToString(this.state.palytime_max)}</span>
						<i>
							<div
								style={{display: this.state.audioShow?"inline-block":""}}
								className="audio_box">
								<span>{this.state.muted?0:this.state.volume}</span>
								<div
								onMouseDown={this.volumeStart}
								ref="volume"
								className="audio">
									{/* 当前音量 */}
									<span
									style={{height: this.state.muted?0:this.state.volume + "%"}}
									className="audio_volume">
										<u></u>
									</span>
									{/* 总音量值 */}
									<span className="volume_box"></span>
								</div>
							</div>
							<i onClick={this.changeMute} className={this.state.muted?"icon_audio_mute":"icon_audio_volume"}></i>
						</i>
						<i onClick={this.changeClarity} className="clarity">自动{/* this.state.fullscreen?"全":this.state.widescreen?"宽":"无" */}</i>
						<i onClick={this.changeBangumi} className={this.state.bangumi?"icon_bangumi_show":"icon_bangumi_hide"}></i>
						<i onClick={this.changeLoop} className={this.state.loop?"icon_play_loop":"icon_play_noloop"}></i>
						<i onClick={this.changeWidescreen} className={this.state.widescreen?"icon_widescreen":"icon_nowidescreen"}></i>
						<i onClick={this.changeFullscreen} className={this.state.fullscreen?"icon_fullscreen":"icon_fullscreen"}></i>
					</div>
					{/* 发送弹幕 */}
					<div className="paly_video_sendmsg clear">
						<i className="icon_dangumi_type"></i>
						<i className="icon_dangumi_color"></i>
						<input type="text" placeholder="您可以在这里输入弹幕吐槽哦~" maxLength="200" />
						<button>发送&nbsp;&gt;</button>
					</div>
				</div>
				<div className="dangumi_box">
					<Dangumi />
				</div>
				<div
				style={{display: this.state.bgHideLayer?"block":""}}
				className="bgHide"></div>
			</div>
		)
	}
}

export default Play
