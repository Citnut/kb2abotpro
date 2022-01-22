const { getParam } = kb2abot.helpers;
const admin = require("../../../CONFIG.js").SUPER_ADMINS;
const msg = {
	menu: `===KB2ABOT===\nHãy phản hồi (reply) tin nhắn này số bạn chọn\n1. Thực hiện chuyển khoản\n2. Xem số dư của bạn\n3. Xem danh sách những người giàu có nhất\n===KB2ABOT===`,
	_menu: `===KB2ABOT===\nHãy phản hồi (reply) tin nhắn này số bạn chọn\n1. Thực hiện chuyển khoản\n2. Xem số dư của bạn\n3. Xem danh sách những người giàu có nhất\n4. (ADMIN) thay đổi số dư của một người dùng\n===KB2ABOT===`,
	chuyenkhoan: `===KB2ABOT===\nĐể thực hiện chuyển khoản hãy phản hồi (reply) tin nhắn này bằng một tin nhắn với định dạng\n<uid/mention>|<số tiền>|[nội dung chuyển khoản]\n===KB2ABOT===`,
	set: `===KB2ABOT===\nĐể thực hiện chỉnh sửa số dư hãy phản hồi (reply) tin nhắn này bằng một tin nhắn với định dạng\n<uid/mention>|<số tiền>|[lời nhắn]\n===KB2ABOT===`
};
module.exports = {
	name: "pay to win :)))",

	keywords: ["pay", "money"],

	description: "giao dịch, chuyển khoản các thứ",

	guide: "",

	
	hookType: "*",

	childs: [],

	permission: {'*': '*'},
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

	async onLoad() {
	},

	async onMessage(message, reply) {
		let storage = this.storage.account.global;
		if (!storage.console.bot) {storage.console.bot={}}
		if (!storage.console.bot.id) {storage.console.bot.id = await require("../../../../../bots/bot.json")[5].value}
		
		
		if (!storage.eco) { storage.eco = {} };
		if (!storage.eco[message.senderID]) { storage.eco[message.senderID] = {} };
		if (!storage.eco[message.senderID].money) { storage.eco[message.senderID].money = 0 };
		if (message.type != "message_reply") return;
		if (message.messageReply.senderID != storage.console.bot.id) return;
		let id = arg = tinnhan = "";
		
		async function bxh () {
			try {
				let arr = [];
				let listid = Object.keys(storage.eco);
				for (const uid of listid) {
					arr.push({
						uid,
						value: storage.eco[uid].money
					});
				};
				arr.sort((a, b) => b.value - a.value);
				let mentions = [];
				let body = `===KB2ABOT===\nTop 10 người giàu có nhất bot này:\n`;
				for (let i = 0; i < arr.length; i++) {
					if (i < 10) {
						body += `${i+1}. ${storage.console[arr[i].uid]}: ${storage.eco[arr[i].uid].money} 💵\n`;
						mentions.push({
							tag: `${storage.console[arr[i].uid]}`,
							id: arr[i].uid
						})
					}else { i = arr.length }
				};
				body += `===KB2ABOT===`
				return reply({
					body,
					mentions
				})
			} catch (e) {
				console.error(e);
				return reply(`đã xảy ra lỗi!`)
			}
		};

		switch (message.messageReply.body) {
			case msg.menu:
				if (isNaN(message.body)) return reply(`lựa chọn của bạn phải là một con số!`);
				switch (message.body) {
					case "1":
						return reply(msg.chuyenkhoan)
					break;
					case "2":
						return reply(`💳 số tài khoản: ${message.senderID}\n💳 số dư chính: ${storage.eco[message.senderID].money}`)
					break;
					case "3":
						return await bxh()
					break;
					default:
						return reply(`lựa chọn của bạn không có trong danh sách!`)
					break
				}
			break;
			case msg._menu:
				if (isNaN(message.body)) return reply(`lựa chọn của bạn phải là một con số!`);
				switch (message.body) {
					case "1":
						return reply(msg.chuyenkhoan)
					break;
					case "2":
						return reply(`💳 số tài khoản: ${message.senderID}\n💳 số dư chính: ${storage.eco[message.senderID].money}💵`)
					break;
					case "3":
						return await bxh()
					break;
					case "4":
						if (!admin.includes(message.senderID)) return reply(`bạn không có quyền sử dụng chức năng này!`);
						return reply(msg.set)
					default:
						return reply(`lựa chọn của bạn không có trong danh sách!`)
					break
				}
			break;
			case msg.chuyenkhoan:
				id = Object.keys(message.mentions)[0] || "";
				arg = message.body.split("|");
				console.log(arg);
				if (isNaN(parseInt(arg[0])) && !id) return reply(`bạn phải gắn thẻ ai đó hoặc nhập một uid!`);
				if (isNaN(parseInt(arg[1])) || parseInt(arg[1]) < 0) return reply(`số tiền phải là một con số và lớn hơn 0`);
				if (storage.eco[message.senderID].money <= 0 || storage.eco[message.senderID].money < parseInt(arg[1])) return reply(`số dư của bạn không khả dụng`);
				tinnhan = message.body.slice(arg[0].length+arg[1].length+2) || " ";

				try{
					let name = message.mentions[id] || storage.console[arg[0]];
					if (!isNaN(arg[0])) {
						if (!storage.console[parseInt(arg[0])]) return reply(`người dùng này chưa xuất hiện!`);
						storage.eco[message.senderID].money -= parseInt(arg[1]);
						storage.eco[arg[0]].money += parseInt(arg[1]);
						return reply({body:`💳 tài khoản thụ hưởng: ${arg[0]}\n💳 người thụ hưởng: ${name}\n💳 giao dịch: +${arg[1]}💵\n💳 nội dung: ${tinnhan}\n💳 số dư chính: ${storage.eco[arg[0]].money}💵`,mentions:[{tag:name,id:arg[0]}]})
					};
					if (id) {
						if (!storage.console[id]) return reply(`người dùng này chưa xuất hiện!`);
						storage.eco[message.senderID].money -= parseInt(arg[1]);
						storage.eco[id].money += parseInt(arg[1]);
						return reply({body:`💳 tài khoản thụ hưởng: ${id}\n💳 người thụ hưởng: ${name}\n💳 giao dịch: +${arg[1]}💵\n💳 nội dung: ${tinnhan}\n💳 số dư chính: ${storage.eco[id].money}💵`,mentions:[{tag:name,id}]})
					}
				} catch (e) {
					console.error(e);
					return reply(`đã xảy ra lỗi!`)
				}
			break;
			case msg.set:
				if (!admin.includes(message.senderID)) return reply(`bạn không có quyền sử dụng chức năng này!`);
				id = Object.keys(message.mentions)[0] || "";
				arg = message.body.split("|");
				console.log(arg);
				if (isNaN(parseInt(arg[0])) && !id) return reply(`bạn phải gắn thẻ ai đó hoặc nhập một uid!`);
				if (isNaN(parseInt(arg[1]))) return reply(`số tiền phải là một con số`);
				//if (storage.eco[message.senderID].money <= 0 || storage.eco[message.senderID].money < parseInt(arg[1])) return reply(`số dư của bạn không khả dụng`);
				tinnhan = message.body.slice(arg[0].length+arg[1].length+2) || " ";
				let sodu = (parseInt(arg[1]) < 0) ? `${arg[1]}` : `+${arg[1]}`;

				try{
					let name = message.mentions[id] || storage.console[arg[0]];
					if (!isNaN(arg[0])) {
						if (!storage.console[parseInt(arg[0])]) return reply(`người dùng này chưa xuất hiện!`);
						storage.eco[arg[0]].money += parseInt(arg[1]);
						return reply({body:`💳 tài khoản: ${id}\n💳 tên người dùng: ${name}\n💳 giao dịch: ${sodu}💵\n💳 nội dung: ${tinnhan}\n💳 số dư chính: ${storage.eco[arg[0]].money}💵`,mentions:[{tag:name,id:arg[0]}]})
					};
					if (id) {
						if (!storage.console[id]) return reply(`người dùng này chưa xuất hiện!`);
						storage.eco[id].money += parseInt(arg[1]);
						return reply({body:`💳 tài khoản: ${id}\n💳 tên người dùng: ${name}\n💳 giao dịch: ${sodu}💵\n💳 nội dung: ${tinnhan}\n💳 số dư chính: ${storage.eco[id].money}💵`,mentions:[{tag:name,id}]})
					}
				} catch (e) {
					console.error(e);
					return reply(`đã xảy ra lỗi!`)
				}
			break;
			default:
			break
		}
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.setmoney != true) return reply("plugin này đã bị tắt");
		/*let storage = this.storage.account.global;
		let id = Object.keys(message.mentions)[0];
		let name = message.mentions[id];
		let arg = getParam(message.body).split(" ");*/

		if (admin.includes(message.senderID)) {
			return reply(msg._menu)
		}else { return reply(msg.menu) }
		/*
		if (isNaN(arg[0])) return reply(`lệnh không hợp lệ!`);
		if (!id) {
			storage.eco[message.senderID].money += parseInt(arg[0]);
			return reply(`tài khoản của bạn đã được cộng thêm ${arg[0]}💵`)
		};
		storage.eco[id].money += parseInt(arg[0]);
		return reply({
			body: `💳 số tài khoản: ${id}\n💳 giao dịch: +${arg[0]}💵\n💳 nội dung: ${name.toUpperCase()} ĐƯỢC ADMIN TẶNG QUÀ\n💳 số dư chính: ${storage.eco[id].money}💵`,
			mentions: [{
				tag: id,
				id
			}]
		})*/
	}
}
