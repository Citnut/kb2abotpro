const { getFile } = kb2abot.helpers;
let att = [getFile("./main/deploy/plugins/citnut/data/noprefix/NHD.jpg"), getFile("./main/deploy/plugins/citnut/data/noprefix/NHDa.jpg")];

module.exports = {
	keywords: ["dat", "đạt", "DAT", "Đạt"],

	name: 'đạt :))',

	description: 'một plugin cực dảk',

	guide: '',

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

	hookType: 'non-command',

	async onMessage(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.autorun != true || message.senderID == this.storage.account.global.console.bot.id) {
		}else if (message.body.toLowerCase().indexOf("đạt") == 0) {
			fca.sendMessage({attachment: att[Math.floor(Math.random() * parseInt(att.length))]}, message.threadID, message.messageID)
		}
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.dat != true) {
			fca.sendMessage("plugin này đã bị tắt", message.threadID, message.messageID)
		}else {
			fca.sendMessage({attachment: att[Math.floor(Math.random() * parseInt(att.length))]}, message.threadID, message.messageID)
		};
	}
};
