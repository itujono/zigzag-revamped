import React, { useEffect, useState } from "react"
import { Row, Col, Menu, Icon, Typography, Input, message, Badge, Dropdown } from "antd"
import { Logo, Heading, Button } from "components"
import styled from "styled-components/macro"
import { Link, withRouter, useHistory, NavLink } from "react-router-dom"
import { connect } from "react-redux"

import { setCartDrawerFromStore } from "store/actions/otherActions"
import { unauthUser } from "store/actions/authActions"
import { updateCartItem, deleteCartItem, fetchProductCategories } from "store/actions/productActions"
import { fetchUser } from "store/actions/userActions"
import CartDrawer from "./common/CartDrawer"
import DynamicIcon from "./DynamicIcon"
import { mobile } from "helpers"

const Nav = styled.nav`
	width: inherit;
	background-color: #fff;
	padding-left: 1em;
	padding-right: 1em;
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
		.dropdown-menu {
			display: block;
		}
		> .ant-menu {
			width: 200px;
			padding-left: 10px;
			.ant-menu-item {
				margin-left: 8px;
			}
		}
	}
`

const StyledCartIcon = styled(Badge)`
	&& {
		> .anticon {
			margin-right: 3px;
		}
	}
`

const StyledLeftMenu = styled(Col)`
	.search-icon {
		font-weight: bold;
		font-size: 18px;
		position: relative;
		top: 5px;
		left: 5px;
	}
`

const StyledMobileMenu = styled(Menu)`
	&& {
		padding: 2em 1.5em;
		width: 220px;
		border-radius: 10px;
		.ant-dropdown-menu-item {
			padding-bottom: 1em;
			i {
				margin-right: 8px;
			}
		}
	}
`

const BottomBar = styled(Row)`
	background-color: #fff;
	border-top: 1px solid #eee;
	margin-top: 1em;
	.scrolling-bar {
		flex-wrap: nowrap;
		overflow-x: scroll;
		width: auto;
		-webkit-overflow-scrolling: touch;
		&::-webkit-scrollbar {
			display: none;
		}
		a {
			color: #999;
		}
	}
`

function Navbar({ user, role, cartDrawerFromStore, cartItems, cartTotal, categories, ...props }) {
	const accountType = JSON.parse(localStorage.getItem("account_type")) || {}
	const token = localStorage.getItem("access_token")

	const [cartDrawer, setCartDrawer] = useState(cartDrawerFromStore)
	const { push } = useHistory()
	const { setCartDrawerFromStore, fetchUser, updateCartItem, deleteCartItem, fetchProductCategories } = props
	const typeId = accountType.account_type_id

	const handleLogout = () => {
		props.unauthUser(push)
	}

	const handleSetCardDrawer = () => {
		setCartDrawerFromStore(true)
		setCartDrawer(true)
	}

	const handleSearch = value => {
		localStorage.setItem("keywordFromNavbar", value)
		message.loading("Mohon tunggu...", 1).then(() => push({ pathname: "/search" }))
	}

	useEffect(() => {
		if (cartDrawerFromStore) setCartDrawer(true)
		if (token) fetchUser()
		fetchProductCategories()
	}, [cartDrawerFromStore, fetchProductCategories, fetchUser, token])

	return (
		<Nav>
			<CartDrawer
				handler={{ updateCartItem, deleteCartItem }}
				onCartDrawer={{ cartDrawer, setCartDrawer, setCartDrawerFromStore, cartDrawerFromStore }}
			/>
			<Row type="flex" justify="space-between">
				<StyledLeftMenu xs={16}>
					<Logo width="60" /> &nbsp; &nbsp;
					{mobile && (
						<Link to="/search" className="search-icon">
							<Icon type="search" />
						</Link>
					)}
					{!mobile && (
						<span>
							<Heading
								bold
								content="Zigzag Batam"
								style={{ display: "inline-block", verticalAlign: "sub" }}
							/>
						</span>
					)}
				</StyledLeftMenu>
				<Col xs={8} style={{ textAlign: "right" }}>
					<RightMenu
						data={{ token, cartItems, user, typeId }}
						handlers={{ handleLogout, handleSearch, handleSetCardDrawer }}
					/>
				</Col>
			</Row>
			{mobile && (
				<BottomBar>
					<Col lg={24} xs={24}>
						<Row type="flex" className="scrolling-bar">
							{categories.map(({ id, name }) => {
								const theIcon =
									id === 1
										? "icon-diamond"
										: id === 2
										? "icon-high-heel-boot"
										: id === 3
										? "icon-tubiaozhizuomoban5"
										: id === 4
										? "icon-bodystocking"
										: "icon-bag"

								return (
									<Col xs={7} key={id}>
										<NavLink to={`/category/${id}-${name.toLowerCase()}`}>
											<DynamicIcon type={theIcon} />
											&nbsp; {name}
										</NavLink>
									</Col>
								)
							})}
						</Row>
					</Col>
				</BottomBar>
			)}
		</Nav>
	)
}

function RightMenu({ data, handlers }) {
	const { token, user, typeId, cartItems } = data
	const { handleLogout, handleSetCardDrawer, handleSearch } = handlers

	const menuMobile = (
		<StyledMobileMenu>
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
			<Menu.Divider style={{ marginBottom: "1em" }} />
			<Menu.Item key="logout" onClick={handleLogout}>
				Logout
			</Menu.Item>
		</StyledMobileMenu>
	)

	if (token) {
		if (mobile) {
			return (
				<>
					<StyledCartIcon dot={cartItems.length > 0} onClick={handleSetCardDrawer}>
						<Icon type="shopping-cart" />
					</StyledCartIcon>
					<Dropdown overlay={menuMobile} trigger={["click"]}>
						<Button
							type="primary"
							icon="more"
							shape="circle"
							size="large"
							style={{ marginLeft: "1.5em" }}
						/>
					</Dropdown>
				</>
			)
		}

		return (
			<StyledMenu mode="horizontal">
				<Menu.Item key="search">
					<Input.Search
						allowClear
						name="search"
						placeholder="Cari apa saja..."
						style={{ width: 200 }}
						onSearch={handleSearch}
					/>
				</Menu.Item>
				<Menu.Item
					key="notifications"
					style={{ paddingLeft: "2em", paddingRight: 0 }}
					onClick={handleSetCardDrawer}
				>
					<StyledCartIcon dot={cartItems.length > 0}>
						<Icon type="shopping-cart" />
					</StyledCartIcon>
				</Menu.Item>
				<StyledSubmenu
					popupClassName="dropdown-menu"
					title={<StyledButton type="ghost" shape="circle-outline" icon="user" />}
				>
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
		)
	}

	if (mobile) {
		return (
			<>
				<StyledCartIcon dot={cartItems.length > 0} onClick={handleSetCardDrawer}>
					<Icon type="shopping-cart" />
				</StyledCartIcon>
				{/* <Dropdown
					overlay={ */}
				{/* <Menu>
					<Menu.Item key="login" style={{ paddingRight: 0 }}> */}
				<Link to="/login">
					<Button type="primary" style={{ marginLeft: "1em" }}>
						Login&nbsp;
						<Icon type="user" style={{ marginRight: 0 }} />
					</Button>
				</Link>
				{/* </Menu.Item>
				</Menu> */}
				{/* // 	}
				// 	trigger={["click"]}
				// >
				// 	<Button type="primary" icon="more" shape="circle" size="large" style={{ marginLeft: "1.5em" }} />
				// </Dropdown> */}
			</>
		)
	}

	return (
		<StyledMenu mode="horizontal">
			<Menu.Item key="search">
				<Input.Search
					allowClear
					name="search"
					placeholder="Cari apa saja..."
					style={{ width: 200 }}
					onSearch={handleSearch}
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
	)
}

const mapState = ({ user, auth, other, product }) => ({
	user: user.user,
	role: auth.role,
	cartDrawerFromStore: other.cartDrawer,
	cartItems: product.cartItems,
	cartTotal: product.cartTotal,
	categories: product.categories.filter(item => item.parent === 0)
})

const actions = {
	setCartDrawerFromStore,
	unauthUser,
	fetchUser,
	updateCartItem,
	deleteCartItem,
	fetchProductCategories
}

// prettier-ignore
export default withRouter(connect(mapState, actions)(Navbar))
