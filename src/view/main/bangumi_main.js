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
		}
	}
	componentDidMount(){
		// const {} = this.props
		// 加载
	}
	render(){
		return (
			<div>
				<div className="bangumi_nav">
					
				</div>
				<div className="bangumi_menu">
					
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