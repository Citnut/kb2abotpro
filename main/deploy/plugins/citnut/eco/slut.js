const { random, round } = kb2abot.helpers;
//const setting = require("../setting.json");
const axios = require("axios");

module.exports = {
	
	name: "đi làm gái ngành :))",
	keywords:["slut"],
	description: "đào mỏ đào mỏ time",
	guide: "",
	hookType: "*",
	childs: [],

	permission: {
		'*': '*'
	},
	datastoreDesign: {
		account: {
			global: {
				xu: {},
				cooldown: {
					slut: {}
				}
			},
			local: {}
		},
		thread: {
			global: {},
			local: {}
		}
	},
	
	async onLoad() {
	},
	async onMessage(message, reply) {
		let storage = this.storage.account.global;

		if (!storage.eco) { storage.eco = {} };

		if (!storage.cooldown) { storage.cooldown = {} };

		if (!storage.cooldown.slut) { storage.cooldown.slut = {} };

		if (!storage.eco[message.senderID]) { storage.eco[message.senderID] = {} };

		if (!storage.eco[message.senderID].money) { storage.eco[message.senderID].money = 0 };

		if (!storage.cooldown.slut[message.senderID]) { storage.cooldown.slut[message.senderID] = 0 }
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.slut != true) {
			return reply("plugin này đã bị tắt")
		}else {
			let storage = this.storage.account.global;
			let slut = storage.cooldown.slut;

			const time = new Date;
			const res = await axios.get(`https://raw.githubusercontent.com/Citnut/Citnut/main/KB2ABotECOConfig.json`);

			const data = res.data;
			if (time.getTime() < slut[message.senderID] + (data.cooldown.slut * 1000)) {
				let cooldown = (slut[message.senderID] + (data.cooldown.slut * 1000)) - time.getTime();
				reply(`vui lòng đợi ${round((cooldown/1000), 0)} giây để tiếp tục`)
			}else {
				slut[message.senderID] = time.getTime();
				let payout = round(random(data.slut.min, data.slut.max), 0);
				storage.eco[message.senderID].money += payout;
				reply(`| +${payout} 💵 | ví của bạn có: ${storage.eco[message.senderID].money} 💵`)
			}
		}
	}
}
