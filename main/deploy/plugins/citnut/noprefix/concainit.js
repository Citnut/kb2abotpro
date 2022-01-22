const { getFile } = kb2abot.helpers;
module.exports = {
	keywords: ["concainit", "nịt"],

	name: 'còn đúng cái nịt thôi!',

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
		}else if (message.body.toLowerCase().indexOf("cái nịt") == 0) {
			fca.sendMessage({
				body: "còn cái nịt!",
				attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/concainit.mp4")
			}, message.threadID, message.messageID)
		}
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.concainit != true) {
			fca.sendMessage("plugin này đã bị tắt", message.threadID, message.messageID)
		}else {
			fca.sendMessage({
				body: "còn cái nịt!",
				attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/concainit.mp4")
			}, message.threadID, message.messageID)
		};
	}
};
