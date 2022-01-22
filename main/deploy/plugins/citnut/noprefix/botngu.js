const { getFile } = kb2abot.helpers;
module.exports = {
	keywords: ["botngu", "ngu"],

	name: 'chửi bot cc',

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
		}else if (message.body.toLowerCase().indexOf("bot ngu") == 0 || message.body.toLowerCase().indexOf("bot cc") == 0) {
			fca.sendMessage({
				body: "bot là siêu vip, là số 1 ok!",
				attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/botngu.jpg")
			}, message.threadID, message.messageID)
		}
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.botngu != true) {
			fca.sendMessage("plugin này đã bị tắt", message.threadID, message.messageID)
		}else {
			fca.sendMessage({
				body: "Ngu cái đb nhà mày à ?",
				attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/botngu.jpg")
			}, message.threadID, message.messageID)
		};
	}
};
