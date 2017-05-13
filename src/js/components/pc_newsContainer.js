import React from "react";
import {Row, Col} from "antd";
import {Carousel} from "antd";
import {Tabs} from "antd";
const TabPane = Tabs.TabPane;
import PCNewsBlock from "./pc_news_block";
import PCNewsImageBlock from "./pc_news_image_block";
import PCProduct from "./pc_product";

export default class PCNewsContainer extends React.Component {
	render() {
		const settings = {
			dots: true, 
			easing: "linear", 
			autoplay: true
		};

		return(
			<div class="container">
				<Row>
					<Col span={2}></Col>
					<Col span={20}>
						<div class="leftContainer">
							<div class="carousel">
								<Carousel {...settings}>
									<div><img src="./src/images/carousel_1.jpg" alt="carousel_1"/></div>
									<div><img src="./src/images/carousel_2.jpg" alt="carousel_2"/></div>
									<div><img src="./src/images/carousel_3.jpg" alt="carousel_3"/></div>
									<div><img src="./src/images/carousel_4.jpg" alt="carousel_4"/></div>
								</Carousel>
							</div>
							<PCNewsImageBlock count={6} type="guoji" cardTitle="国际头条" width="400px" imageWidth="112px"/>
						</div>
						<Tabs class="tabs_news">
							<TabPane tab="头条新闻" key="1">
								<PCNewsBlock count={22} type="top" width="100%" bordered="false"/>
							</TabPane>
							<TabPane tab="国际新闻" key="2">
								<PCNewsBlock count={22} type="guoji" width="100%" bordered="false"/>
							</TabPane>
						</Tabs>
						<Tabs class="tabs_product">
							<TabPane tab="ReactNews产品" key="1">
								<PCProduct />
							</TabPane>
						</Tabs>	
						<div>
							<PCNewsImageBlock count={8} type="guonei" cardTitle="国内新闻" width="100%" imageWidth="132px"/>
							<PCNewsImageBlock count={16} type="yule" cardTitle="娱乐新闻" width="100%" imageWidth="132px"/>
						</div>
					</Col>
					<Col span={2}></Col>
				</Row>
			</div>
		);
	}
}