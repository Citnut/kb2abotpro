const { getFile } = kb2abot.helpers;
module.exports = {
	keywords: ["cmsn", "happybirthday", "snvv"],

	name: 'happy birthday',

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
		}else if (message.body.toLowerCase().indexOf("cmsn") == 0 || message.body.toLowerCase().indexOf("snvv") == 0) {
			fca.sendMessage({
				body: "Happy Birthday To You 😽 😽 😽",
				attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/cmsn.mp4")
			}, message.threadID, message.messageID)
		}
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.cmsn != true) {
			fca.sendMessage("plugin này đã bị tắt", message.threadID, message.messageID)
		}else {
			fca.sendMessage({
				body: "Happy Birthday To You 😽 😽 😽",
				attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/cmsn.mp4")
			}, message.threadID, message.messageID)
		};
	}
};
