#!/usr/bin/env node

/**
 * filego
 * cli to recursively upload files/folder to anonymous file-sharing platforms
 *
 * @author Ysn4Irix <https://github.com/Ysn4Irix>
 */

const init = require('./utils/init')
const cli = require('./utils/cli')
const log = require('./utils/log')
const { initialize } = require('./utils/core')

const input = cli.input
const flags = cli.flags

;(async () => {
	if (input.length === 0) {
		init()
		cli.showHelp(0)
	}

	if (flags.help) {
		cli.showHelp(0)
	}

	if (input.includes('up') && flags.source !== '' && flags.output !== '') {
		await initialize(flags.source, flags.output)
	}
	flags.debug && log(flags)
})()
