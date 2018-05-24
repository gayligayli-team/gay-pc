import React, { Component } from "react"
import './../../static/css/from.css'


/*
 * @param
 * type								String(text
 * title							String(Empty
 * value							String(Empty
 * label	|placeholder			String(Empty
 * readonly							Boolean(False
 * error	|提示					String(Null
 * max		|maxlength				Number(Empty
 *
 * options	|options				Array([]
 * disabled	|disabled				Boolean(False
 * css		|class					String(Null
 * width	|style					
 * click	|event					Function(Null
 */


class Input extends Component{
	// constructor(props){
	// 	super(props)
	// }
	state = {
		dataSource: []
	}
	handleChange = e => {
		this.props.changeValue(e);
	}
	render(){
		const {
			placeholder,
			type,
			name,
			value,
			max,
			width,
			css,
		} = this.props;
		return (
			<input
			placeholder={placeholder}
			type={type}
			name={name}
			defaultValue={value}
			onChange={this.handleChange}
			maxLength={max}
			style={{width: width+"px"}}
			className={`${css?css+" ":""}from_input`} />
		)
	}
}
class Checkbox extends Component{
	// constructor(props){
	// 	super(props)
	// }
	event = _ => {
		this.props.change();
	}
	render(){
		const {
			placeholder,
			name,
			width,
		} = this.props;
		return (
			<input
			onClick={this.event}
			placeholder={placeholder}
			type="checkbox"
			name={name}
			style={{width: width+"px"}}
			className="from_checkbox" />
		)
	}
}
class Select extends Component{
	// constructor(props){
	// 	super(props)
	// }
	render(){
		return (
			<select
			className="from_select">
				{this.props.options.map((child, index) =>(
					<option
					value={child.value}
					key={index}>{child.text}</option>
				))}
			</select>
		)
	}
}
class Button extends Component{
	// constructor(props){
	// 	super(props)
	// }
	event = e => {
		if(typeof this.props.disabled === 'undefined')return;
		!this.props.disabled&&this.props.change();
	}
	handleChange = e => {
		if(typeof this.props.click === 'undefined') return;
		this.props.click(e);
	}
	render(){
		return (
			<button
			style={{width: this.props.width+"px"}}
			onClick={this.handleChange}
			className={`${this.props.css?this.props.css+" ":""}${this.props.disabled?"disabled ":""}from_button`}>{this.props.remind || this.props.title}</button>
		)
	}
}


export {
	Input,
	Checkbox,
	Select,
	Button,
}