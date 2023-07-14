const welcome = require('cli-welcome')
const pkg = require('./../package.json')
const unhandled = require('cli-handle-unhandled')

module.exports = () => {
	unhandled()
	welcome({
		title: `filego`,
		tagLine: `by Ysn4Irix`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#00E298',
		color: '#000000',
		bold: true
	})
}
