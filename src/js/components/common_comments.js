import React from "react";
import {Row, Col, Form, Input, Button, Card, notification} from "antd";
const FormItem = Form.Item;

class CommonComments extends React.Component {
	constructor() {
		super();
		this.state = {
			comments: ""
		};
	}
	componentDidMount() {
		let myFetchOptions = {
			method: "GET"
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.setState({comments: json});
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		let myFetchOptions = {
			method: "GET"
		};
		let formData = this.props.form.getFieldsValue();
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formData.comment, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.componentDidMount();
		}); 
	}
	addUserCollection() {
		let myFetchOptions = {
			method: "GET"
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			notification["success"]({
				message: "ReactNews提醒", 
				description: "收藏成功"
			});
		});
	}
	render() {
		const {getFieldDecorator} = this.props.form;
		const {comments} = this.state;
		const commentList = comments.length
			? comments.map((comment, index) => (
				<Card key={index} title={comment.UserName} extra={<a href="#">发布于 {comment.datetime}</a>}>
					<p>{comment.Comments}</p>
				</Card>
			))
			: "没有加载到任何评论";

		return(
			<div class="comment">
				<Row>
					<Col span={24}>
						{commentList}
						<Form onSubmit={this.handleSubmit.bind(this)}>
							<FormItem label="您的评论">
								{getFieldDecorator("comment", {
									rules: [{required: true, message: "评论不能为空"}]
								})(
									<Input type="textarea" placeholder="随便写" />
								)}
							</FormItem>
							<Button type="primary" htmlType="submit">提交评论</Button>
							&nbsp;&nbsp;
							<Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏此文章</Button>
						</Form>
					</Col>
				</Row>
			</div>
		);
	}
}

export default CommonComments = Form.create()(CommonComments);