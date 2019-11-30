import React from "react"
import { Layout as PageLayout, Breadcrumb, Menu } from "antd"
import { Navbar, Logo, Heading } from "components"
import styled from "styled-components"
import { withRouter, NavLink } from "react-router-dom"
import { media, mobile } from "helpers"

import SidebarMenu from "./_SidebarMenu"

const Header = styled(PageLayout.Header)`
	&& {
		${media.mobile`
            padding-left: 1em;
            padding-right: 1em;
        `}
	}

	&& {
		padding: 0 35px;
		background-color: #fff;
		height: 5em;
		border-bottom: 1px solid #eee;
	}
`
const Footer = styled(PageLayout.Footer)`
	text-align: center;
	padding: 3em;
	border-top: 1px solid #eee;
`

const Section = styled.section`
	padding-left: 4em;
	padding-right: 4em;
	padding-top: 3em;
`

const Bread = styled(Breadcrumb)`
	margin-bottom: 2em;
`

const Sidebar = styled(PageLayout.Sider)`
	${media.mobile`
		&&& {
			padding-left: 0;
		}
	`}
	&& {
		min-height: 100vh;
		background: transparent;
		padding-left: 2em;
		border-right: 1px solid #eee;
		.ant-layout-sider-children {
			> div {
				position: sticky;
				top: 10px;
				left: 0;
			}
		}
		.ant-menu-vertical {
			border-right: none;
		}
		.ant-layout-sider-trigger {
			background: #ff9d00;
		}
		.ant-menu {
			background: transparent;
		}
	}
`

function Layout({ basic = false, sidebar = false, children, breadcrumb = false, location = {}, history, ...props }) {
	const loc = location && location.pathname.split("/")
	const bread = loc.map((item, idx) => (idx === 0 ? ["Home", ...item] : [...item]))

	return (
		<PageLayout>
			{!basic && (
				<Header>
					<Navbar />
				</Header>
			)}

			<PageLayout.Content>
				<PageLayout>
					{sidebar && (
						<Sidebar breakpoint="lg" reverseArrow collapsible collapsedWidth={0} width="200">
							<SidebarMenu page={props.page || ""} />
						</Sidebar>
					)}

					<PageLayout>
						<PageLayout.Content>
							{breadcrumb && (
								<Section>
									<Bread>
										{bread.map((item, idx) => (
											<Breadcrumb.Item key={idx}>{item}</Breadcrumb.Item>
										))}
									</Bread>
								</Section>
							)}
							{children}
						</PageLayout.Content>
						{sidebar && (
							<Footer>
								<div>
									<Logo width="80" /> <br />
									<p>
										<strong>The CCS</strong> &middot; all rights reserved 2019
									</p>
								</div>
							</Footer>
						)}
					</PageLayout>
				</PageLayout>
			</PageLayout.Content>

			{!basic && !sidebar && (
				<Footer>
					<div>
						<Logo width="80" /> <br />
						<br />
						<p>
							<strong>The CCS</strong> &middot; all rights reserved 2019
						</p>
					</div>
				</Footer>
			)}
		</PageLayout>
	)
}

export default withRouter(Layout)
