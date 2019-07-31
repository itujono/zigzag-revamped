import React from "react"
import { Row, Col, Menu, Icon, Typography } from "antd"
import { Logo, Heading, Button } from "components"
import styled from "styled-components"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"

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

function Navbar({ user, role, ...props }) {
	const handleLogout = () => {
		props.unauthUser()
	}

	user = "Muksin"

	return (
		<Nav>
			<Row type="flex" justify="space-between">
				<Col>
					<Logo /> &nbsp;{" "}
					<span>
						<Heading
							bold
							content="Cudy KPI Dashboard"
							style={{ display: "inline-block", verticalAlign: "sub" }}
						/>
					</span>
				</Col>
				<Col style={{ textAlign: "right" }}>
					{user ? (
						<StyledMenu mode="horizontal">
							<Menu.Item key="notifications" style={{ paddingLeft: "2em", paddingRight: 0 }}>
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
export default withRouter(connect(null, {})(Navbar))
