import React from "react"
import { Modal as Pop } from "antd"
import styled from "styled-components"

const StyledModal = styled(Pop)`
	.ant-modal-content {
		border-radius: 8px;
		.ant-modal-body {
			padding: 2em 3em;
		}
	}
`

export default function Modal(props) {
	return <StyledModal {...props} centered footer={false} />
}
