import React, { useEffect, useState } from "react"
import { Row, Col, Menu, Icon, Typography, List, Avatar } from "antd"
import { Logo, Heading, Button } from "components"
import styled from "styled-components/macro"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import Drawer from "./Drawer"
import { cartItems } from "helpers/dummy"
import { pricer } from "helpers"
import Section from "./Section"
import { theme } from "styles"

const Nav = styled.nav`
	width: inherit;
`

const StyledButton = styled(props => <Button {...props} />)`
	&& {
		.anticon {
			margin-right: 0;
		}
	}
`

const StyledMenu = styled(Menu)`
	&& {
		border-bottom: transparent;
		padding-top: 5px;
		line-height: 4;
		> .ant-menu-submenu,
		.ant-menu-item,
		.ant-menu-submenu-selected {
			border-bottom: 2px solid transparent;
			&:hover {
				border-bottom: 2px solid transparent;
			}
		}
	}
`

const CartItem = styled(List.Item)`
	.ant-list-item-meta-avatar {
		margin-right: 24px;
		.product-photo {
			width: 60px;
			height: 80px;
		}
	}
`

const SubtotalSection = styled(Section).attrs({
	paddingHorizontal: "0"
})`
	border-top: 1px solid ${theme.greyColor[2]};
	.ant-typography {
		h4 {
			font-size: 1em;
		}
		> div {
			font-size: 0.9em;
			color: ${theme.greyColor[1]};
		}
	}
	.price {
		font-weight: bold;
	}
`

function Navbar({ user, role, ...props }) {
	const [cartDrawer, setCartDrawer] = useState(false)

	const handleLogout = () => {
		// props.unauthUser()
		console.log("Logged out...")
	}

	user = "Muksin"

	return (
		<Nav>
			<Drawer
				placement="right"
				closable={false}
				width={540}
				onClose={() => setCartDrawer(false)}
				visible={cartDrawer}
				css={`
					.ant-drawer-body {
						padding: 2em 3em;
					}
				`}
			>
				<Heading content="Cart kamu" level={4} bold />
				<List
					itemLayout="horizontal"
					dataSource={cartItems}
					renderItem={item => (
						<CartItem>
							<List.Item.Meta
								avatar={<Avatar src={item.photo} shape="square" className="product-photo" />}
								title={
									<p style={{ marginBottom: 0 }}>
										<a href="https://ant.design">{item.name}</a> &middot;{" "}
										<span>
											Rp {pricer(item.price)} x {item.quantity} &nbsp;{" "}
											<span className="delete">
												<Icon type="delete" />
											</span>
										</span>
									</p>
								}
								description="Ant Design, a design language for background applications, is refined by Ant UED Team"
							/>
						</CartItem>
					)}
				/>
				<SubtotalSection>
					<Row type="flex" justify="space-between" gutter={32}>
						<Col lg={16}>
							<Heading
								content="Subtotal"
								subheader="Ongkir dan biaya lainnya akan dikalkulasikan di bagian Checkout"
							/>
						</Col>
						<Col lg={8} style={{ textAlign: "right" }}>
							<p className="price">Rp 560,000</p>
						</Col>
					</Row>
					<Button block size="large">
						Lanjut ke Checkout &nbsp; <Icon type="right" />
					</Button>
				</SubtotalSection>
			</Drawer>
			<Row type="flex" justify="space-between">
				<Col>
					<Logo /> &nbsp;{" "}
					<span>
						<Heading
							bold
							content="Zigzag Batam"
							style={{ display: "inline-block", verticalAlign: "sub" }}
						/>
					</span>
				</Col>
				<Col style={{ textAlign: "right" }}>
					{user ? (
						<StyledMenu mode="horizontal">
							<Menu.Item
								key="notifications"
								style={{ paddingLeft: "2em", paddingRight: 0 }}
								onClick={() => setCartDrawer(true)}
							>
								<Icon type="bell" theme="filled" />
							</Menu.Item>
							<Menu.SubMenu title={<StyledButton type="ghost" shape="circle-outline" icon="user" />}>
								<Menu.Item key="greeting">
									<Typography.Paragraph strong>Hi, Mulyawan!</Typography.Paragraph>
								</Menu.Item>
								<Menu.Item key="profile">
									<Link to="/profile">View profile</Link>
								</Menu.Item>
								<Menu.Divider />
								<Menu.Item key="logout" onClick={handleLogout}>
									Logout
								</Menu.Item>
							</Menu.SubMenu>
						</StyledMenu>
					) : (
						<StyledMenu mode="horizontal">
							<Menu.Item key="login" style={{ paddingRight: 0 }}>
								<Button shape="circle" type="primary">
									<Icon type="user" style={{ marginRight: 0 }} />
								</Button>
							</Menu.Item>
						</StyledMenu>
					)}
				</Col>
			</Row>
		</Nav>
	)
}

const mapState = ({ user, auth }) => ({ user: user.user, role: auth.role })

// prettier-ignore
export default withRouter(connect(mapState, {})(Navbar))
