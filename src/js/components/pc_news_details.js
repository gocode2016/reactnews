import React from 'react';
import {Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from "./common_comments";

export default class PCNewsDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			newsItem: '', 
			newsType: "top"
		};
		this.newsType = "top";
	}
	componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({newsItem: json});
			this.getNewsType();
			document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
		});
	}
	createMarkup() {
		return {__html: this.state.newsItem.pagecontent};
	}
	getNewsType() {
		console.log("2:" + this.state.newsItem.realtype);
		switch(this.state.newsItem.realtype) {
			case "娱乐": 
				this.setState({newsType: "yule"}); break;
			case "国际":
				this.setState({newsType: "guoji"}); break;
			case "国内":
				this.setState({newsType: "guonei"}); break;
			case "头条": 
				this.setState({newsType: "top"}); break;
			case "社会":
				this.setState({newsType: "shehui"}); break;
			case "体育":
				this.setState({newsType: "tiyu"}); break;
			default: 
				this.setState({newsType: "top"}); break;
		}
	}
	render() {
		console.log("1:" + this.state.newsItem.realtype);
		console.log("did:" + this.state.newsType);
		const type = this.state.newsType;
		return (
			<div>
				<PCHeader></PCHeader>
				<Row>
					<Col span={2}></Col>
					<Col span={14} className="container">
						<div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
						<hr />
						<CommonComments uniquekey={this.props.params.uniquekey}/>
					</Col>
					<Col span={6}>
						<PCNewsImageBlock count={40} type={type} width="100%" cardTitle="相关新闻" imageWidth="150px"/>
					</Col>
					<Col span={2}></Col>
				</Row>
				<PCFooter></PCFooter>
				<BackTop/>
			</div>
		);
	};
}