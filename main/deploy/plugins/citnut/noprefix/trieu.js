const { getFile } = kb2abot.helpers;
module.exports = {
	keywords: ["2m", "2tr", "2trieu", "20m"],

	name: 'này thì 2 triệu!',

	description: 'plugin do Trương Đăng Dương cùng Citnut làm đó',

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
		}else if (message.body.toLowerCase().includes("hai triệu")) {
			fca.sendMessage({
				body: "này thì 2 triệu!",
				attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/trieu.mp4")
			}, message.threadID, message.messageID)
		}
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.trieu != true) {
			fca.sendMessage("plugin này đã bị tắt", message.threadID, message.messageID)
		}else {
			fca.sendMessage({
				body: "này thì 2 triệu!",
				attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/trieu.mp4")
			}, message.threadID, message.messageID)
		};
	}
};
