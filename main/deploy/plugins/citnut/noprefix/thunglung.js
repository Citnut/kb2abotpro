const { getFile } = kb2abot.helpers;
module.exports = {
	keywords: ["thunglung", "quathunglung"],

	name: 'khi anh qua thung lũng...',

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
		}else if (message.body.toLowerCase().includes("thung lũng")) {
			fca.sendMessage({
				body: "khi anh qua thung lũng...",
				attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/thunglung.mp4")
			}, message.threadID, message.messageID)
		}
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.thunglung != true) {
			fca.sendMessage("plugin này đã bị tắt", message.threadID, message.messageID)
		}else {
			fca.sendMessage({
				body: "khi anh qua thung lũng...",
				attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/thunglung.mp4")
			}, message.threadID, message.messageID)
		};
	}
};
