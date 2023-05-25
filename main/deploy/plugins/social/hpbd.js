import * as fs from "node:fs"

const path = require('path');
const uniqid = require('uniqid');
const merge = require('merge-images');
const jimp = require('jimp');
const {Canvas, Image} = require('canvas');

let access_token = null;

module.exports = {
	keywords: ['hpbd', 'cmsn'],

	name: 'Happy birthday',

	description: 'Chúc mừng sinh nhật cho một người bạn',

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

		const uid = Object.keys(message.mentions)[0];
		if (!uid) return reply('Bạn chưa tag người được chúc!');
		const secret = uniqid();
		const avatar = await jimp.read(
			`https://graph.facebook.com/${uid}/picture?height=720&width=720&access_token=${access_token}`
		);
		avatar.resize(150, 150);
		await avatar.writeAsync(path.join(__dirname, 'temp', `${secret}A.jpg`));

		const res = await merge(
			[
				{
					src: path.join(__dirname, 'images/sinhnhat.jpg')
				},
				{
					src: path.join(__dirname, `temp/${secret}A.jpg`),
					x: 325,
					y: 505
				}
			],
			{Canvas, Image}
		);
		fs.writeFileSync(
			path.join(__dirname, 'temp', `${secret}.jpg`),
			res.replace(/^data:image\/png;base64,/, ''),
			'base64'
		);

		const name = message.mentions[Object.keys(message.mentions)[0]];
		await reply({
			body: `Chúc mừng sinh nhật ${name} ♥️♥️`,
			mentions: [
				{
					tag: `${name}`,
					id: uid
				}
			],
			attachment: [
				fs.createReadStream(path.join(__dirname, 'temp', `${secret}.jpg`))
			]
		});
		fs.unlinkSync(path.join(__dirname, `temp/${secret}.jpg`));
		fs.unlinkSync(path.join(__dirname, `temp/${secret}A.jpg`));
	}
};
