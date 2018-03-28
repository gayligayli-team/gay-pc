import React, { Component } from "react"
import './../../static/css/register_slider.css'

// import api from './../../api/fetch'

import event from './../../api/event.js'



class RegSlider extends Component{
	constructor(props){
		super(props)
		this.state = {
			blockRate: 0,
			blockVal: 0,
			validState: false,
			imageStatus: false,
			moveStatus: false,
			foucsStatus: false,
		}
	}
	url = "https://www.alice47.com/validate_img/0.png";
	sliderStart = e => {
		e.stopPropagation();
		e.preventDefault();
		if(this.state.validState)return;
		// 当前X轴偏移
		this.barPos = e.clientX;
		this.blockPos = e.clientX-e.currentTarget.getBoundingClientRect().left;
		event.add(document, 'mousemove', this.sliderMove);
		event.add(document, 'mouseup', this.sliderEnd);
		// 显示验证图
		this.setState({
			moveStatus: true,
		});
		this.imgIn = setTimeout(_ =>{
			this.setState({
				imageStatus: true,
			});
		}, 500);
	}
	sliderMove = e => {
		let _val = this.blockPos + e.clientX - this.barPos;
		let changeVal = Math.max(Math.min(_val, this.refs.block.clientWidth), 0)
		let rate = changeVal/ this.refs.block.clientWidth * 100;
		this.setState({
			blockRate: rate,
		});
	}
	sliderEnd = _ => {
		this.validate();
		event.remove(document, 'mousemove', this.sliderMove);
		event.remove(document, 'mouseup', this.sliderEnd);
		// 隐藏验证图
		this.setState({
			moveStatus: false,
		});
		if(this.state.foucsStatus)return;
		this.imgOut = setTimeout(_ =>{
			this.setState({
				imageStatus: false,
			});
		}, 1000);
	}
	validate = _ => {
		let _move = this.state.blockRate*1.7;
		let _max = this.props.x+5;
		let _min = this.props.x-5;
		if(_move>_min&&_move<_max){
			this.setState({
				blockRate: this.props.x/1.7,
				validState: true,
			});
			this.props.validing(this.props.x);
			console.log("验证成功");
		}else{
			setTimeout(_ =>{
				this.setState({
					blockRate: 0
				});
			}, 500);
			console.log("验证失败");
		}
	}
	imageShow = _ => {
		this.setState({
			foucsStatus: true,
		});
		clearTimeout(this.imgOut);
		this.imgIn = setTimeout(_ =>{
			this.setState({
				imageStatus: true,
			});
		}, 500);
	}
	imageHide = _ => {
		this.setState({
			foucsStatus: false,
		});
		if(this.state.moveStatus)return;
		clearTimeout(this.imgIn);
		this.imgOut = setTimeout(_ =>{
			this.setState({
				imageStatus: false,
			});
		}, 1000);
	}
	render(){
		return (
			<div
				onMouseEnter={this.imageShow}
				onMouseLeave={this.imageHide}
				className="register_slider">
				<div
				ref="block"
				className="reg_slider_content">
					<i
					onMouseDown={this.sliderStart}
					style={{left: this.state.blockRate + "%"}}
					className="reg_slider_block"></i>
				</div>
				<div className="reg_slider_bar">
					{/* 验证图 */}
					<div
					style={{display: this.state.imageStatus?"block":"none"}}
					className="reg_slider_image">
						<div className="reg_slider_bg"></div>
						<img src={this.url} alt="" />
						<div className="reg_slider_obstruct">
							<u
							style={{left: this.props.x + "px",
							top: this.props.y + "px",
							backgroundPositionX: -this.props.x-7 + "px",
							backgroundPositionY: -this.props.y-1 + "px"}}
							className=""></u>
							<u
							style={{left: this.props.x + "px",
							top: this.props.y + "px",
							backgroundPositionX: -this.props.x-7 + "px",
							backgroundPositionY: -this.props.y-1 + "px",
							backgroundImage: `url(${this.url})`}}
							className="block_layer"></u>
							<i
							style={{left: this.state.blockRate + "%",
							top: this.props.y + "px",
							backgroundPositionX: -this.props.x-7 + "px",
							backgroundPositionY: -this.props.y-1 + "px",
							backgroundImage: `url(${this.url})`}}
							className=""></i>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default RegSlider