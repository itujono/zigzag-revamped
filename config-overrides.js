const { override, fixBabelImports, addLessLoader } = require("customize-cra")

module.exports = override(
	fixBabelImports("import", {
		libraryName: "antd",
		libraryDirectory: "es",
		style: true
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {
			"@primary-color": "#66ceb2",
			"@link-color": "#66ceb2",
			"@font-family": "'Futura Medium', Arial, Helvetica, sans-serif"
		}
	})
)
