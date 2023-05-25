import * as fs from "node:fs"

const path = require('path');
const uniqid = require('uniqid');
const merge = require('merge-images');
const jimp = require('jimp');
const {Canvas, Image} = require('canvas');

let access_token = null;

module.exports = {
	keywords: ['shower', 'tam'],

	name: 'Tắm',

	description: 'Tắm chung với một người bạn',

	guide: '<@mention>',

	childs: [],

	permission: {
		'*': '*'
	},

	datastoreDesign: {
		account: {
			global: {},
			local: {}
		},
		thread: {
			global: {},
			local: {}
		}
	},

	async onLoad() {},

	hookType: 'none',

	async onMessage(message, reply) {},

	async onCall(message, reply) {
		if (!access_token) {
			access_token = await kb2abot.helpers.fca.getToken();
		}

		const uidA = message.senderID;
		const uidB = Object.keys(message.mentions)[0];
		if (!uidB) return reply('Bạn chưa tag bạn bè!');
		const secret = uniqid();

		const imgA = await jimp.read(
			`https://graph.facebook.com/${uidA}/picture?height=720&width=720&access_token=${access_token}`
		);
		imgA.resize(180, 180);
		await imgA.writeAsync(path.join(__dirname, 'temp', `${secret}A.jpg`));

		const imgB = await jimp.read(
			`https://graph.facebook.com/${uidB}/picture?height=720&width=720&access_token=${access_token}`
		);
		imgB.resize(180, 180);
		await imgB.writeAsync(path.join(__dirname, 'temp', `${secret}B.jpg`));

		const res = await merge(
			[
				{
					src: path.join(__dirname, 'images/shower.jpg')
				},
				{
					src: path.join(__dirname, `temp/${secret}A.jpg`),
					x: 841,
					y: 287
				},
				{
					src: path.join(__dirname, `temp/${secret}B.jpg`),
					x: 233,
					y: 143
				}
			],
			{Canvas, Image}
		);
		fs.writeFileSync(
			path.join(__dirname, 'temp', `${secret}.jpg`),
			res.replace(/^data:image\/png;base64,/, ''),
			'base64'
		);

		await reply({
			body: 'Lộ hàng . . .',
			attachment: [
				fs.createReadStream(path.join(__dirname, 'temp', `${secret}.jpg`))
			]
		});
		fs.unlinkSync(path.join(__dirname, `temp/${secret}.jpg`));
		fs.unlinkSync(path.join(__dirname, `temp/${secret}A.jpg`));
		fs.unlinkSync(path.join(__dirname, `temp/${secret}B.jpg`));
	}
};
