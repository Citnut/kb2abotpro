import * as fs from "node:fs"

const path = require('path');
const uniqid = require('uniqid');
const merge = require('merge-images');
const jimp = require('jimp');
const {Canvas, Image} = require('canvas');

let access_token = null;

module.exports = {
	keywords: ['marry', 'cuoi'],

	name: 'Lễ vu quy',

	description: 'Cưới một người bạn',

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
		if (!uidB) return reply('Bạn chưa tag đối tác!');
		const secret = uniqid();

		const imgA = await jimp.read(
			`https://graph.facebook.com/${uidA}/picture?height=720&width=720&access_token=${access_token}`
		);
		imgA.resize(50, 50);
		await imgA.writeAsync(path.join(__dirname, 'temp', `${secret}A.jpg`));

		const imgB = await jimp.read(
			`https://graph.facebook.com/${uidB}/picture?height=720&width=720&access_token=${access_token}`
		);
		imgB.resize(50, 50);
		await imgB.writeAsync(path.join(__dirname, 'temp', `${secret}B.jpg`));

		const res = await merge(
			[
				{
					src: path.join(__dirname, 'images/marry.jpg')
				},
				{
					src: path.join(__dirname, `temp/${secret}A.jpg`),
					x: 200,
					y: 23
				},
				{
					src: path.join(__dirname, `temp/${secret}B.jpg`),
					x: 136,
					y: 40
				}
			],
			{Canvas, Image}
		);
		fs.writeFileSync(
			path.join(__dirname, 'temp', `${secret}.jpg`),
			res.replace(/^data:image\/png;base64,/, ''),
			'base64'
		);

		const BName = message.mentions[Object.keys(message.mentions)[0]];
		await reply({
			body: 'Cơm chó ngon lắm :0. Chúc hai bạn hạnh fúck 😡',
			attachment: [
				fs.createReadStream(path.join(__dirname, 'temp', `${secret}.jpg`))
			]
		});
		fs.unlinkSync(path.join(__dirname, `temp/${secret}.jpg`));
		fs.unlinkSync(path.join(__dirname, `temp/${secret}A.jpg`));
		fs.unlinkSync(path.join(__dirname, `temp/${secret}B.jpg`));
	}
};
