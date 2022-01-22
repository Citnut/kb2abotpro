const { getParam } = kb2abot.helpers;
//const setting = require("../setting.json");
module.exports = {
	
	name: "thêm người dùng vào nhóm chat",
	// tên thân thiện của plugin (để hiển thị trong danh sách câu lệnh)
	keywords:["adduser", "add"],
	// Là các từ khóa để gọi plugin adduser (có thể có nhiều cái)

	description: "thêm người dùng vào nhóm bằng uid của họ",
	// Là nội dung của plugin (dùng để hiển thị trong hướng dẫn chi tiết)

	guide: "<UID>",
	// Là hướng dẫn sử dụng của plugin (dùng để hiển thị trong hướng dẫn chi tiết)
	
	hookType: "*",
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
		if (setting.run.adduser != true) {
			return reply("plugin này đã bị tắt")
		}else {
			if (message.senderID == message.threadID) {
				return reply("bạn không thể thực hiện điều này tại đây")
			}else {
				fca.addUserToGroup(getParam(message.body), message.threadID, function (err) {
					if (err) {
						return reply(`không thể thêm id ${getParam(message.body)} vào nhóm này`)
					}else {
						return reply("done")
					}
				})
			}
		}
		// Được gọi khi có member xài lệnh của mình
		// Là cốt lõi của plugin không có phần này thì có nghĩa sẽ không có chuyện
		// gì xảy ra khi gọi plugin (để hideFromHelp true nữa là plugin như batman)
	}
}
