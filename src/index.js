import React from "react"
import ReactDOM from "react-dom"
import moment from "moment"
import "antd/dist/antd.css"
import "./styles/index.less"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import "moment/locale/id"

moment.locale("id")

ReactDOM.render(<App />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
