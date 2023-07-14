const ora = require('ora')
const alert = require('cli-alerts')
const {
	existsSync,
	createWriteStream,
	createReadStream,
	lstatSync
} = require('fs')
const os = require('os')
const path = require('path')
const { green: g, yellow: y, dim: d, red: r } = require('chalk')
const axios = require('axios')
const archiver = require('archiver')
const FormData = require('form-data')
const hosts = require('./hosts.json')

const spinner = ora({
	text: ''
})

/**
 * function that takes a source path and an output path, checks if they are valid, zips
 * the source path if its a folder, and saves the file/folder uploaded links to a text file in the
 * output directory.
 * @param source - represents the path to the source file or folder that you want to upload, It can be a
 * file path or a directory path. If it is a directory path, it will zip the directory and
 * upload the zip file. If it is a file path, it will upload the file.
 * @param output - the path where the output file will be saved.
 * @returns {promise<void>}
 */
const initialize = async (source, output) => {
	if (source !== '' && output !== '') {
		if (!existsSync(source)) {
			alert({
				type: `error`,
				msg: `Invalid Source Path or File/Folder not found! use --help for infos`
			})
			return
		}
		if (!existsSync(output)) {
			alert({
				type: `error`,
				msg: `Invalid output path or directory not found! use --help for infos`
			})
			return
		}

		try {
			console.log()
			if (lstatSync(source).isDirectory()) {
				try {
					console.log(`${y(`Folder detected!`)}`)
					console.log()
					spinner.start(`${y(`🚀 Zipping...`)}\n`)

					const zipLocation =
						os.platform() === 'win32'
							? `C:/Windows/Temp/${path.basename(source)}.zip`
							: `/tmp/${path.basename(source)}.zip`

					await zipDir(source, zipLocation)

					spinner.succeed(`${g(`Folder zipped successfully!`)}\n`)
					spinner.stop()

					try {
						spinner.start(
							`${y(`🚀 Uploading...`)}  \n\n${d(
								`Please wait it may take a few moments depending on your internet speed...`
							)}`
						)
						const responses = await upload(zipLocation)
						spinner.succeed(
							`${g(`Folder uploaded successfully!`)}\n`
						)
						spinner.stop()

						if (output) {
							spinner.start(`${y(`💾 Saving...`)}\n`)
							const saveLocation = path.join(
								output,
								`${path.basename(source)}.txt`
							)

							const { size } = lstatSync(zipLocation)

							if (size > 5000000000) {
								spinner.fail(
									`${r(
										`File size is too large! maximum file size is 5GB`
									)}`
								)
								return
							}

							const saveStream = createWriteStream(saveLocation)
							saveStream.write(
								`File: ${path.basename(
									source
								)}.zip\nSize: ${convertBytes(size)}\n\n`
							)
							responses.forEach(response => {
								const { data } = response.data
								saveStream.write(
									`${response.host}: ${data.file.url.short}\n`
								)
							})
							saveStream.end()
							spinner.succeed(
								`${g(`File saved successfully!`)}\n`
							)
						}
					} catch (err) {
						spinner.fail(
							`${r(
								'Something went wrong while uploading! try again later'
							)}`
						)
					}
				} catch (error) {
					spinner.fail(
						`${r(` Error while zipping or uploading the folder! `)}`
					)
				}
			} else if (lstatSync(source).isFile()) {
				try {
					console.log(`${y(`File detected!`)}`)
					console.log()

					spinner.start(`${y(`🚀 Uploading...`)}\n`)

					const { size } = lstatSync(source)

					if (size > 5000000000) {
						spinner.fail(
							`${r(
								`File size is too large! maximum file size is 5GB`
							)}`
						)
						return
					}

					const responses = await upload(source)
					spinner.succeed(`${g(`File uploaded successfully!`)}\n`)
					spinner.stop()

					if (output) {
						spinner.start(`${y(`💾 Saving...`)}\n`)
						const saveLocation = path.join(
							output,
							`${path.basename(source)}.txt`
						)

						const saveStream = createWriteStream(saveLocation)
						saveStream.write(
							`File: ${path.basename(
								source
							)}\nSize: ${convertBytes(size)}\n\n`
						)

						responses.forEach(response => {
							const { data } = response.data
							saveStream.write(
								`${response.host}: ${data.file.url.short}\n`
							)
						})
						saveStream.end()
						spinner.succeed(`${g(`File saved successfully!`)}\n`)
					}
				} catch (error) {
					spinner.fail(
						`${r(
							'Something went wrong while uploading! try again later'
						)}`
					)
				}
			}
		} catch (error) {
			spinner.fail(`${r(`Something went wrong! try again later`)}`)
		}
	} else {
		spinner.fail(`${r(`Invalid arguments! use --help for infos`)}`)
	}
}

/**
 * The `zipDir` function takes a source directory and a target file path, and creates a zip file
 * containing the contents of the source directory at the specified target location.
 * @param source - The `source` parameter is the directory that you want to zip. It should be a string
 * representing the path to the directory you want to zip.
 * @param target - The `target` parameter is the path and filename of the zip file that will be
 * created. It specifies where the zip file will be saved and what it will be named.
 * @returns The `zipDir` function returns a Promise.
 */
const zipDir = (source, target) => {
	const output = createWriteStream(target)
	const archive = archiver('zip', {
		zlib: { level: 9 }
	})

	return new Promise((resolve, reject) => {
		output.on('close', () => {
			resolve()
		})

		archive.on('error', err => {
			reject(err)
		})

		archive.pipe(output)
		archive.directory(source, false)
		archive.finalize()
	})
}

/**
 * The function `upload` takes a source file, creates a FormData object, and then sends a POST request
 * to multiple hosts recursively using axios.
 * @param source - the file path that you want to upload. It should be a string
 * @returns The `upload` function returns a promise that resolves to an array of responses from the
 * `axios.post` requests made to each host.
 */
const upload = async source => {
	let responses = []

	await Promise.all(
		hosts.map(async host => {
			const formData = new FormData()
			formData.append('file', createReadStream(source))
			const { data } = await axios.post(host.url, formData, {
				headers: {
					...formData.getHeaders(),
					'User-Agent':
						'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 uacq'
				}
			})
			responses.push({
				host: host.name,
				data
			})
		})
	)
	return responses
}

/**
 * The function `convertBytes` converts a given number of bytes into a human-readable format with
 * appropriate units (Bytes, KB, MB, GB, TB).
 * @returns a string that represents the converted value
 */
const convertBytes = bytes => {
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

	if (bytes == 0) {
		return 'n/a'
	}
	const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

	if (i == 0) {
		return bytes + ' ' + sizes[i]
	}
	return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
}

module.exports = {
	initialize
}
