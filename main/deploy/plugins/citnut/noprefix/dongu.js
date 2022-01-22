const { getFile } = kb2abot.helpers;
module.exports = {
	keywords: ["ngu", "dongu"],

	name: 'Đồ ngu, đồ ăn hại!',

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
		}else if (message.body.toLowerCase().includes("đồ ngu")) {
			fca.sendMessage({
				body: "Đồ ngu, đồ ăn hại!",
				attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/dongu.mp4")
			}, message.threadID, message.messageID)
		}
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.dongu != true) {
			fca.sendMessage("plugin này đã bị tắt", message.threadID, message.messageID)
		}else {
			fca.sendMessage({
				body: "Đồ ngu, đồ ăn hại!",
				attachment: getFile("./main/deploy/plugins/citnut/data/noprefix/dongu.mp4")
			}, message.threadID, message.messageID)
		};
	}
};
