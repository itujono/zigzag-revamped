import React, { useEffect, useState } from "react"
import { Row, Col, Menu, Icon, Typography, List, Avatar, Input } from "antd"
import { Logo, Heading, Button } from "components"
import styled from "styled-components/macro"
import { Link, withRouter, useHistory } from "react-router-dom"
import { connect } from "react-redux"

import { setCartDrawerFromStore } from "store/actions/otherActions"
import { unauthUser } from "store/actions/authActions"
import CartDrawer from "./common/CartDrawer"

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

const token = localStorage.getItem("access_token")

function Navbar({ user, role, cartDrawerFromStore, setCartDrawerFromStore, ...props }) {
	const [cartDrawer, setCartDrawer] = useState(cartDrawerFromStore)
	const { push } = useHistory()

	const handleLogout = () => {
		props.unauthUser(push)
	}

	const handleSetCardDrawer = () => {
		setCartDrawerFromStore(true)
		setCartDrawer(true)
	}

	useEffect(() => {
		if (cartDrawerFromStore) setCartDrawer(true)
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
							<Menu.SubMenu title={<StyledButton type="ghost" shape="circle-outline" icon="user" />}>
								<Menu.Item key="greeting">
									<Typography.Paragraph strong>Hi, Mulyawan!</Typography.Paragraph>
								</Menu.Item>
								<Menu.Item key="profile">
									<Link to="/profile">Lihat profile</Link>
								</Menu.Item>
								<Menu.Item key="upgrade">
									<Link to="/upgrade">Upgrade akun</Link>
								</Menu.Item>
								<Menu.Divider />
								<Menu.Item key="logout" onClick={handleLogout}>
									Logout
								</Menu.Item>
							</Menu.SubMenu>
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
export default withRouter(connect(mapState, {setCartDrawerFromStore, unauthUser})(Navbar))
