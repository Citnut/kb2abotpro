const { getFile } = kb2abot.helpers;
module.exports = {
	keywords: ["hao", "hảo", "hảohảo"],

	name: 'hảo hán cái đ*t mẹ mày',

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
		}else if (message.body.toLowerCase().includes("hảo")) {
			fca.sendMessage({attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/haohan.mp4")}, message.threadID, message.messageID)
		}
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.haohan != true) {
			fca.sendMessage("plugin này đã bị tắt", message.threadID, message.messageID)
		}else {
			fca.sendMessage({attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/haohan.mp4")}, message.threadID, message.messageID)
		};
	}
};
