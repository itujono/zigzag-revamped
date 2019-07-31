import React from "react"
import { Layout as PageLayout, Breadcrumb } from "antd"
import { Navbar, Logo } from "components"
import styled from "styled-components"
import { withRouter } from "react-router-dom"
import { media } from "helpers"

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
						<Sidebar breakpoint="lg" reverseArrow collapsible collapsedWidth={0} width="250">
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
									<Logo width="80" type="text" /> <br /> <br />
									<p>
										<strong>Cudy Pte Ltd</strong> &middot; all rights reserved 2019
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
						<Logo width="80" type="text" /> <br />
						<br /> <br />
						<p>
							<strong>Cudy Pte Ltd</strong> &middot; all rights reserved 2019
						</p>
					</div>
				</Footer>
			)}
		</PageLayout>
	)
}

export default withRouter(Layout)
