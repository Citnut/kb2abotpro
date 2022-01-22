const axios = require("axios");
//const setting = require("../setting.json");
module.exports = {
	keywords: ["cadao"],

	name: "ca dao",

	description: "",
	// Nội dung của plugin (hiển thị trong hướng dẫn chi tiết)

	guide: "",
	hookType: "*",
	childs: [],

	permission: {
		'*': '*'
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
		if (setting.run.cadao != true) {
			return reply("plugin này đã bị tắt")
		}else {
			const res = await axios.get(global.api.cadao);

			return reply(res.data.data)
		}
		// Được gọi khi có member xài lệnh của mình
		// Là cốt lõi của plugin không có phần này thì có nghĩa sẽ không có chuyện
		// gì xảy ra khi gọi plugin (để hideFromHelp true nữa là plugin như batman)
	}
};
