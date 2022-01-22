const { calendar } = require("../func.js");
//const setting = require("../setting.json");
module.exports = {
	name: "lịch Việt Nam",
	// Tên thân thiện của plugin (hiển thị trong danh sách câu lệnh)

	keywords: ["calendar"],

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


	async onLoad() {
		// Được gọi ngay sau khi load xong plugin
		// Chủ yếu dùng để log thôi không quan trọng
		// (Hoặc cũng có thể chuẩn bị các async function bằng await)
	},

	async onMessage(message, reply) {
		// Được gọi mỗi khi có message nhắn tới (kể cả khi dùng lệnh)
		// Chủ yếu dùng để làm mấy plugin kiểu gián điệp hoặc game
		// Xử lí mọi tin nhắn mà không cần prefix
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.calendar != true) {
			return reply("plugin này đã bị tắt")
		}else {
			//const res = await axios.get(`https://api.vangbanlanhat.tk/other?type=calendar`);
			//const data = res.data.data.solar;
			const res = await calendar();
			const data = res.solar;
			let weekday = "";
			switch (data.weekday) {
				case "1":
				weekday = `thứ hai`;
				break;
				case "2":
				weekday = `thứ ba`;
				break;
				case "3":
				weekday = `thứ tư`;
				break;
				case "4":
				weekday = `thứ năm`;
				break;
				case "5":
				weekday = `thứ sáu`;
				break;
				case "6":
				weekday = `thứ bảy`;
				break;
				case "7":
				weekday = `chủ nhật`;
				break;
				default:
				break
			};
			let day = data.day;
			let month = data.month;
			let year = data.year;

			fca.sendMessage(`hôm nay là:\n\r${weekday} ngày ${day} tháng ${month} năm ${year}`, message.threadID, message.messageID)
		}
		// Được gọi khi có member xài lệnh của mình
		// Là cốt lõi của plugin không có phần này thì có nghĩa sẽ không có chuyện
		// gì xảy ra khi gọi plugin (để hideFromHelp true nữa là plugin như batman)
	}
};
