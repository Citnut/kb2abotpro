const { getFile } = kb2abot.helpers;
module.exports = {
	keywords: ["vovanhoa", "vvh"],

	name: 'vô văn hoá',

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
		}else if (message.body.toLowerCase().includes("vô văn hóa")) {
			fca.sendMessage({
				body: "vô văn hoá",
				attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/vovanhoa.mp4")
			}, message.threadID, message.messageID)
		}
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.vovanhoa != true) {
			fca.sendMessage("plugin này đã bị tắt", message.threadID, message.messageID)
		}else {
			fca.sendMessage({
				body: "vô văn hoá",
				attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/vovanhoa.mp4")
			}, message.threadID, message.messageID)
		};
	}
};
