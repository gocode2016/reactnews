import React from "react"; 
import MobileHeader from "./mobile_header";
import MobileFooter from "./mobile_footer";
import MobileList from "./mobile_list";
import { Tabs, Carousel } from "antd";
const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component {
	render() {
		const settings = {
			dots: true, 
			easing: "linear", 
			autoplay: true
		};

		return (
			<div>
				<MobileHeader></MobileHeader>
				<Tabs>
					<TabPane tab="头条" key="top">
						<div class="carousel">
							<Carousel {...settings}>
								<div><img src="./src/images/carousel_1.jpg" alt="carousel_1"/></div>
								<div><img src="./src/images/carousel_2.jpg" alt="carousel_2"/></div>
								<div><img src="./src/images/carousel_3.jpg" alt="carousel_3"/></div>
								<div><img src="./src/images/carousel_4.jpg" alt="carousel_4"/></div>
							</Carousel>
						</div>
						<MobileList count={20} type="top" />
					</TabPane>
					<TabPane tab="国内" key="guonei">
						<MobileList count={20} type="guonei" />
					</TabPane>
					<TabPane tab="国际" key="guoji">
						<MobileList count={20} type="guoji" />
					</TabPane>
					<TabPane tab="社会" key="shehui">
						<MobileList count={20} type="shehui" />
					</TabPane>
					<TabPane tab="娱乐" key="yule">
						<MobileList count={20} type="yule" />
					</TabPane>
				</Tabs>
				<MobileFooter></MobileFooter>
			</div>
		);
	}
} 