import React, { Component } from 'react'
import './static/css/util.css'
import './static/css/icon_config.css'

import 'whatwg-fetch'

class App extends Component {
	render() {
		return (
			<div>
				{/*子组件*/}
				{this.props.children}
			</div>
		)
	}
}

export default App
