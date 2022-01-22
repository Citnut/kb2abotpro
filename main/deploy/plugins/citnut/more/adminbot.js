//const setting = require("../setting.json");
module.exports = {
	name: "xem thông tin của admin bot",
	// tên thân thiện của plugin (để hiển thị trong danh sách câu lệnh)
	keywords:["adbot", "adminbot", "ad", "admin"],
	// Là các từ khóa để gọi plugin adbot (có thể có nhiều cái)

	description: "plugin này dùng để xem thông tin của admin bot",
	// Là nội dung của plugin (dùng để hiển thị trong hướng dẫn chi tiết)

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
	hookType: 'none',

	async onLoad() {
		//let now = new Date();
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
		let ad = this.storage.account.global.adinf;
		if (setting.run.adminbot != true) {
			return reply("plugin này đã bị tắt")
		}else { fca.sendMessage(ad, message.threadID, message.messageID) }
		// Được gọi khi có member xài lệnh của mình
		// Là cốt lõi của plugin không có phần này thì có nghĩa sẽ không có chuyện
		// gì xảy ra khi gọi plugin (để hideFromHelp true nữa là plugin như batman)
	}
}
