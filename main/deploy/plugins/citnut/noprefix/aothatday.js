const { getFile } = kb2abot.helpers;


module.exports = {
	keywords: ["aothatday", "ao"],

	name: 'ảo thế...',

	description: 'plugin của Hoàng Hải Long, dịch sang kb2abot plugin bởi Citnut',

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
		}else if ((message.body.toLowerCase()).indexOf("ảo") == 0) {
			fca.sendMessage({
				body: "Djtconmemay ảo con mẹ mày suốt ngày ảo 🙃",
				attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/aothatday.mp3")
			}, message.threadID, message.messageID)
		}
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.aothatday != true) {
			fca.sendMessage("plugin này đã bị tắt", message.threadID, message.messageID)
		}else {
			fca.sendMessage({
				body: "Djtconmemay ảo con mẹ mày suốt ngày ảo 🙃",
				attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/aothatday.mp3")
			}, message.threadID, message.messageID)
		};
	}
};
