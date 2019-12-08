import React, { useEffect, useState } from "react"
import { Row, Col, Menu, Icon, Typography, List, Avatar, Input } from "antd"
import { Logo, Heading, Button } from "components"
import styled from "styled-components/macro"
import { Link, withRouter, useHistory } from "react-router-dom"
import { connect } from "react-redux"

import { setCartDrawerFromStore } from "store/actions/otherActions"
import { unauthUser } from "store/actions/authActions"
import { fetchUser } from "store/actions/userActions"
import CartDrawer from "./common/CartDrawer"
import DynamicIcon from "./DynamicIcon"

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

const StyledSubmenu = styled(Menu.SubMenu)`
	&& {
		> .ant-menu {
			width: 200px;
			padding-left: 10px;
		}
	}
`

const token = localStorage.getItem("access_token")
const accountType = JSON.parse(localStorage.getItem("account_type")) || {}

function Navbar({ user, role, cartDrawerFromStore, setCartDrawerFromStore, fetchUser, ...props }) {
	const [cartDrawer, setCartDrawer] = useState(cartDrawerFromStore)
	const { push } = useHistory()
	const typeId = accountType.account_type_id

	const handleLogout = () => {
		props.unauthUser(push)
	}

	const handleSetCardDrawer = () => {
		setCartDrawerFromStore(true)
		setCartDrawer(true)
	}

	useEffect(() => {
		if (cartDrawerFromStore) setCartDrawer(true)
		fetchUser()
	}, [cartDrawerFromStore, token])

	return (
		<Nav>
			<CartDrawer onCartDrawer={{ cartDrawer, setCartDrawer, setCartDrawerFromStore, cartDrawerFromStore }} />
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
					{token ? (
						<StyledMenu mode="horizontal">
							<Menu.Item key="search">
								<Input.Search
									allowClear
									name="search"
									placeholder="Cari apa saja..."
									style={{ width: 200 }}
									onSearch={value => push({ pathname: "/search", state: { keyword: value } })}
								/>
							</Menu.Item>
							<Menu.Item
								key="notifications"
								style={{ paddingLeft: "2em", paddingRight: 0 }}
								onClick={handleSetCardDrawer}
							>
								<Icon type="bell" theme="filled" />
							</Menu.Item>
							<StyledSubmenu title={<StyledButton type="ghost" shape="circle-outline" icon="user" />}>
								<Menu.Item key="greeting">
									<Typography.Paragraph strong>Hi, {user.name}</Typography.Paragraph>
								</Menu.Item>
								<Menu.Item key="profile">
									<Link to="/profile">
										<DynamicIcon type="icon-tubiaozhizuomoban6" /> Lihat profile
									</Link>
								</Menu.Item>
								{typeId === 1 && (
									<Menu.Item key="upgrade">
										<Link to="/upgrade">
											<DynamicIcon type="icon-tubiaozhizuomoban2" /> Upgrade akun
										</Link>
									</Menu.Item>
								)}
								<Menu.Divider />
								<Menu.Item key="logout" onClick={handleLogout}>
									Logout
								</Menu.Item>
							</StyledSubmenu>
						</StyledMenu>
					) : (
						<StyledMenu mode="horizontal">
							<Menu.Item key="search">
								<Input.Search
									allowClear
									name="search"
									placeholder="Cari apa saja..."
									style={{ width: 200 }}
									onSearch={value => console.log({ search: value })}
								/>
							</Menu.Item>
							<Menu.Item key="login" style={{ paddingRight: 0 }}>
								<Link to="/login">
									<Button shape="circle" type="primary">
										<Icon type="user" style={{ marginRight: 0 }} />
									</Button>
								</Link>
							</Menu.Item>
						</StyledMenu>
					)}
				</Col>
			</Row>
		</Nav>
	)
}

const mapState = ({ user, auth, other }) => ({
	user: user.user,
	role: auth.role,
	cartDrawerFromStore: other.cartDrawer
})

// prettier-ignore
export default withRouter(connect(mapState, {setCartDrawerFromStore, unauthUser, fetchUser})(Navbar))
