import event from './event'

const video = {
	el: null,
	init(el){
		this.el = el;
	},
	play(){
		this.el.play();
	},
	stop(){
		this.el.pause();
	},
	time(){
		return this.el.currentTime;
	},
	setTime(time){
		console.warn(this.el.currentTime, time);
		this.el.currentTime = time;
	},
	mute(mute){
		this.el.muted = mute?true:false;
	},
	setVolume(v){
		this.el.volume = v/100;
	},
	fullscreen(fn){
		let fulldom = this.el.parentNode.parentNode;
		if(this.el.webkitRequestFullScreen){
			fulldom.webkitRequestFullScreen();
			event.add(document, 'webkitfullscreenchange', fn);
		}else if(this.el.mozRequestFullScreen){
			fulldom.mozRequestFullScreen();
			event.add(document, 'mozfullscreenchange', fn);
		}else if(this.el.msRequestFullscreen){
			fulldom.msRequestFullscreen();
			event.add(document, 'MSFullscreenChange', fn);
		}else if(this.el.requestFullscreen){
			fulldom.requestFullscreen();
			event.add(document, 'fullscreenchange', fn);
		}else{
			console.log("Error: fullscreen is not call")
		}
	},
	cancelscreen(fn){
		console.log("cancel");
		if(document.webkitCancelFullScreen){
			document.webkitCancelFullScreen();
			event.remove(document, 'webkitfullscreenchange', fn);
		}else if(document.mozCancelFullScreen){
			document.mozCancelFullScreen();
			event.remove(document, 'mozfullscreenchange', fn);
		}else if(document.msExitFullscreen){
			document.msExitFullscreen();
			event.remove(document, 'MSFullscreenChange', fn);
		}else if(document.exitFullscreen){
			document.exitFullscreen();
			event.remove(document, 'fullscreenchange', fn);
		}else{
			console.log("Error: fullscreen is not call")
		}
	},

	setRate(n){
		this.el.playbackRate = n;
	},
	// 当前
	getSeekState(){
		console.error(this.el.seeking);
		console.error(this.el.seekable);
		console.error(this.el.seekable.start(0), this.el.seekable.end(0));
	},
}
export default video;