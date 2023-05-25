const _setting = require("./setting.json");
const axios = require("axios");
const { getParam } = kb2abot.helpers;
const citnut = {
	"trungthu": "september 10, 2022 00:00:00",
	"tet": "february 1, 2022 00:00:00",
	"tetthieunhi": "june 1, 2022 00:00:00",
	"ca": "april 1, 2022 00:00:00"
};
const ad = `===ADMIN❤===\ntên: Nguyễn Thanh Chính\nchiều cao: 1m70\ncân nặng: 58kg\ncontact: https://fb.com/nguyen.thanh.chinhs\n===KB2ABOT===`;
const adname = `Nguyễn Thanh Chính`;

module.exports = {
	adname,
	
	async calendar () {
		let res = await axios.get(`https://api.vangbanlanhat.tk/other?type=calendar`);
		return res.data.data
	},
	async festival (name) {
		let data = "";

		switch (name) {
			case "trungthu":
				data = citnut.trungthu;
			break;
			case "tet":
				data = citnut.tet;
			break;
			case "tetthieunhi":
				data = citnut.tetthieunhi;
			break;
			case "ca":
				data = citnut.ca;
			break;
			default:
			break
		};
		return data	
	},
	keywords: ['setting', 'config', 'function', 'sett'],

	name: 'Citnut plugin functions',

	description: 'keyword:true||false hoặc restore',

	guide: '',

	childs: [],

	permission: {
		'*': 'SUPER_ADMINS'
	},

	datastoreDesign: {
		account: {
			global: {
				citSetting: _setting
			},
			local: {}
		},
		thread: {
			global: {},
			local: {}
		}
	},

	async onLoad() {},

	hookType: '*',

	async onMessage(message, reply) {
		let data = this.storage.account.global;

		if (!data.citSetting) { data.citSetting = _setting };
		if (!data.adinf || data.adinf != ad) { data.adinf = ad }
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		let prefix = this.storage.thread.global.prefix;

		if (!setting) { setting = _setting };

		async function run (name) {
			let keyword, value, succMsg = "";
			if (Object.keys(setting.run).includes(name) != Object.keys(_setting.run).includes(name)) {
				try {
					setting = {};
					setting = _setting;
					console.newLogger.error(`***PLUGIN: CITNUT! ĐÃ XẢY RA LỖI HÃY XÓA DATA CỦA SETTING***`);
					reply(`[PLUGIN: CITNUT] ĐÃ XẢY RA LỖI`)
				} catch (error) {
					console.newLogger.error(`***PLUGIN: CITNUT! KHÔNG THỂ SỬA LỖI***`);
					reply(`[PLUGIN: CITNUT] KHÔNG THỂ SỬA LỖi\n`)
				};
			}else if (Object.keys(setting.run).includes(name)) {
				reply(`===SETTING ⭐===\n${name}: ${setting.run[name]}\n==============\nđể thay đổi thiết đặt hiện tại sử dụng lệnh: ${prefix}setting ${name}:true (hoặc false)`)
			}else if (name.includes("autorun")) {
				switch (name) {
					case "autorun:false":
					setting.autorun = false;
					reply(`đã tắt chế độ noprefix ( Citnut plugin )`)
					break;
					case "autorun:true":
					setting.autorun = true;
					reply(`đã bật chế độ noprefix ( Citnut plugin )`)
					break;
					case "autorun":
					reply(`===SETTING ⭐===\n${name}: ${setting.autorun}\n==============\nđể bật/tắt chế độ noprefix ( Citnut plugin ) sử dụng lệnh: ${prefix}setting ${name}:true (hoặc false)`)
					break;
					default:
					break
				}
			}else if (!name.includes(`:true`) && !name.includes(`:false`)) {
				return reply(`giá trị không chính xác, hãy đặt giá trị là true hoặc false`)
			}else if (name.includes(`:true`) && Object.keys(setting.run).includes(name.slice(0, -5))) {
				keyword = name.slice(0, -5); value = true; succMsg = `[DONE] đã bật lệnh ${keyword}`;
				try { setting.run[keyword] = value; reply(succMsg) } catch (error) { reply("đã xảy ra lỗi") }
			}else if (name.includes(`:false`) && Object.keys(setting.run).includes(name.slice(0, -6))) {
				keyword = name.slice(0, -6); value = false; succMsg = `[DONE] đã tắt lệnh ${keyword}`;
				try { setting.run[keyword] = value; reply(succMsg) } catch (error) { reply("đã xảy ra lỗi") }
			}else {	reply(`sai keyword!`) }
		};


		async function menu() {
			let noprefix = "";
			let on = [];
			let off = [];
			let obj = setting.run;
			let arr = Object.keys(obj);

			(setting.autorun) ? (noprefix = "đã bật") : (noprefix = "đã tắt");

			for (let i = 0; i < arr.length; i++) {
				if (obj[arr[i]]) {
					on.push(` ${arr[i]}`)
				}else {
					off.push(` ${arr[i]}`)				
				}
			};
			reply(`===⭐CITNUT⭐===\nNoprefix: ${noprefix},\n+Lệnh đang hoạt động:${on.toString()}\n+Lệnh đã tắt:${off.toString()}\n===KB2ABOT===`)
		};
		

		if (getParam(message.body) == "restore") {
			try { setting = _setting; reply(`đã khôi phục cài đặt gốc`)} catch (error) { reply("đã xảy ra lỗi") }
		}else if (getParam(message.body) == "") {
			menu()
		}else{ run(getParam(message.body)) }
	}
}
