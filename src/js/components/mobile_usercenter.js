import React from "react";
import MobileHeader from "./mobile_header";
import MobileFooter from "./mobile_footer";
import {Tabs, Row, Col, Upload, Icon, Modal, Card} from "antd";
const TabPane = Tabs.TabPane;

export default class MobileUserCenter extends React.Component {
	constructor() {
		super();
		this.state = {
			previewVisible: false, 
			previewImage: "", 
			userCollection: "", 
			userComments: ""
		};
	}
	componentDidMount() {
		const myFetchOptions = {
			method: "GET"
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.setState({userCollection: json});
		});
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.setState({userComments: json});
		});
	}
	handleCancel() {
		this.setState({previewVisible: false});
	}
	render() {
		const props = {
			action: "http://newsapi.gugujiankong.com/handler.ashx", 
			headers: {
				"Access-Control-Allow-Origin": "*"
			}, 
			listType: "picture-card", 
			defaultFileList: [
				{
					uid: -1, 
					name: "xxx.png", 
					state: "done", 
					url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", 
					thumburl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
				}
			], 
			onPreview: (file) => {
				this.setState({previewVisible: true, previewImage: file.url})
			}
		};
		const {userCollection, userComments} = this.state;
		const userCollectionList = userCollection.length
		? userCollection.map((uc, index) => (
			<Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>}>
				<p>{uc.Title}</p>
			</Card>
		))
		: "您尚未收藏任何文章，快去收藏一些文章吧";
		const userCommentsList = userComments.length
		? userComments.map((comment, index) => (
			<Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a href={`/#/details/${comment.uniquekey}`}>查看</a>}>
				<p>{comment.Comments}</p>
			</Card>
		))
		: "您尚未发表过评论";
		return(
			<div>
				<MobileHeader></MobileHeader>
				<Row>
					<Col span={24}>
						<Tabs>
							<TabPane tab="文章收藏列表" key="1">
								<Row>	
									<Col span={24}>
										{userCollectionList}
									</Col>
								</Row>
							</TabPane>
							<TabPane tab="我的评论列表" key="2">
								<Row>	
									<Col span={24}>
										{userCommentsList}
									</Col>
								</Row>
							</TabPane>
							<TabPane tab="头像设置" key="3">
							    <div>
									<Upload {...props}>
										<Icon type="plus" />
										<div className="ant-upload-text">上传照片</div>
									</Upload>
									<Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
          								<img alt="预览" style={{ width: '100%' }} src={this.state.previewImage} />
        							</Modal>
        						</div>
							</TabPane>
						</Tabs>
					</Col>
				</Row>
				<MobileFooter></MobileFooter>
			</div>
		);
	}
}