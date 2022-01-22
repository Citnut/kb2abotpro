const { random, round } = kb2abot.helpers;
//const setting = require("../setting.json");
const axios = require("axios");

module.exports = {
	
	name: "ăn chộm ăn cắp",
	keywords:["crime"],
	description: "tiền tiền tiền",
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
					crime: {}
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

		if (!storage.cooldown.crime) { storage.cooldown.crime = {} };

		if (!storage.eco[message.senderID]) { storage.eco[message.senderID] = {} };

		if (!storage.eco[message.senderID].money) { storage.eco[message.senderID].money = 0 };

		if (!storage.cooldown.crime[message.senderID]) { storage.cooldown.crime[message.senderID] = 0 }
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.crime != true) {
			return reply("plugin này đã bị tắt")
		}else {

			let storage = this.storage.account.global;
			let crime = storage.cooldown.crime;

			const time = new Date;
			const res = await axios.get(`https://raw.githubusercontent.com/Citnut/Citnut/main/KB2ABotECOConfig.json`);

			const data = res.data;
			if (time.getTime() < crime[message.senderID] + (data.cooldown.crime * 1000)) {
				let cooldown = (crime[message.senderID] + (data.cooldown.crime * 1000)) - time.getTime();
				return reply(`vui lòng đợi ${round((cooldown/1000), 0)} giây để tiếp tục`)
			}else {
				let arr = [];
				let total = 100;
				for (let i = 0; i <= total; i++) {
					if (i <= total/10) {
						arr.push(true)
					}else { arr.push(false) }
				};

				let newArr = arr.sort(() => Math.random() - 0.5);
    			if (newArr[round(random(0, total), 0)]) {
    				crime[message.senderID] = time.getTime();
					let payout = round(random(data.crime.min, data.crime.max), 0);
					storage.eco[message.senderID].money += payout;
					reply(`| +${payout} xu | ví của bạn có: ${storage.eco[message.senderID].money} 💵`)
    			}else {
    				crime[message.senderID] = time.getTime();
					let lose = round(random(data.crime.lose.min, data.crime.lose.max), 0);
					storage.eco[message.senderID].money -= lose;
					reply(`bạn đã bị công an bắt và phải nộp phạt ${lose} 💵`)
    			}
			}
			/*if (5 < round(random(0, 10), 0) < 6){
				crime[message.senderID] = time.getTime();
				let payout = round(random(data.crime.min, data.crime.max), 0);
				storage.eco[message.senderID].money += payout;
				rep(`| +${payout} xu | ví của bạn có: ${storage.eco[message.senderID].money} 💵`)
			}else {
				crime[message.senderID] = time.getTime();
				let lose = round(random(data.crime.lose[0], data.crime.lose[1]), 0);
				storage.eco[message.senderID].money -= lose;
				rep(`bạn đã bị công an bắt và phải nộp phạt ${lose} 💵`)
			}*/
		}
	}
}
