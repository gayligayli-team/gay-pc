import React, { Component } from "react"
import './../../static/css/menu.css'

// 菜单导航
class Menu extends Component{
	constructor(props){
		super(props)
		this.state = {
			menuList: [
				// "首页",
				"动画",
				"番剧",
				"国创",
				"音乐",
				"舞蹈",
				"游戏",
				"科技",
				"生活",
				"鬼畜",
				"时尚",
				"广告",
				"娱乐",
				"影视",
				"放映厅",

				// "专栏",
				// "广场",
				// "直播",
				// "小黑屋",
			]
		}
	}
	render(){
		return (
			<div className="menu">
				<ul className="clear">
					<li>
						<span><i className="icon"></i></span>
						<span>首页</span>
					</li>
					{this.state.menuList.map((e, index) => (
						<li key={index+1}>
							<span><u>{e.count>999?"999+":e.count || "--"}</u></span>
							<span>{e}</span>
						</li>
					))}
					<li>
						<span><i className="icon"></i></span>
						<span className="otherMenu">专栏</span>
					</li>
					<li>
						<span><i className="icon"></i></span>
						<span className="otherMenu">广场</span>
					</li>
					<li>
						<span><i className="icon"></i></span>
						<span className="otherMenu">直播</span>
					</li>
					<li>
						<span><i className="icon"></i></span>
						<span className="otherMenu">小黑屋</span>
					</li>
				</ul>
				<TagIcon />
			</div>
		)
	}
}
// 趣图(tag_icon
class TagIcon extends Component{
	render(){
		return (
			<div className="tagIcon">
			</div>
		)
	}
}

export default Menu