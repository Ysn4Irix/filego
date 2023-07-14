const meow = require('meow')
const meowHelp = require('cli-meow-help')

const flags = {
	source: {
		type: `string`,
		default: '',
		desc: `file or folder to be uploaded`,
		alias: `s`,
		required: true
	},
	output: {
		type: `string`,
		default: '',
		desc: `Output directory`,
		alias: `o`,
		required: true
	},
	clear: {
		type: `boolean`,
		default: false,
		desc: `Clear the console`
	},
	help: {
		type: `boolean`,
		default: false,
		desc: `Print help info`
	},
	debug: {
		type: `boolean`,
		default: false,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	}
}

const commands = {
	up: {
		desc: `Upload a file or folder`,
		usage: `filego up <source>`
	}
}

const helpText = meowHelp({
	name: `filego`,
	flags,
	commands,
	defaults: false
})

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	allowUnknownFlags: false,
	flags
}

module.exports = meow(helpText, options)
