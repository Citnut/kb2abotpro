const { getFile } = kb2abot.helpers;
module.exports = {
	keywords: ["hacker", "hack", "hắc", "hackẻ", "hacku"],

	name: 'hacker VN pro vip',

	description: 'plugin được làm bởi Citnut',

	guide: '',

	childs: [],
	permission: {
		'*': '*'
	},
	datastoreDesign: {
		account: {
			global: {},
			local: {},
		},
		thread: {
			global: {},
			local: {},
		},
	},
	async onLoad() {
		// Sau khi load xong plugin và login bot, hàm này sẽ được gọi
		// Chủ yếu dùng để log hoặc gửi greeting message thôi không quan trọng
	},

	hookType: 'none',
	// Bộ lọc tin nhắn cho hàm onMessage (hàm onCall không bị ảnh hưởng)
	// '*': Lắng nghe tất cả tin nhắn
	// 'none': Không lắng nghe tin nhắn
	// 'command-only': Chỉ lắng nghe câu lệnh
	// 'non-command': Chỉ lắng nghe tin nhắn không phải câu lệnh

	async onMessage(message, reply) {
		// Được gọi mỗi khi đáp ứng yêu cầu hookType
		// Chủ yếu dùng để làm mấy plugin kiểu gián điệp hoặc game
		// Xử lí mọi tin nhắn mà không cần prefix
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.hacker != true) {
			return reply("plugin này đã bị tắt")
		}else {
			let att = [getFile("./main/deploy/plugins/citnut/data/hacker.mp4"), getFile("./main/deploy/plugins/citnut/data/hacku.mp4")];
			fca.sendMessage({body: "hacker :)))", attachment: att[Math.floor(Math.random() * parseInt(att.length))]}, message.threadID, message.messageID)
		}
		// Được gọi khi có member xài lệnh plugin này
		// Là cốt lõi của plugin không có phần này thì có nghĩa sẽ không có chuyện
		// gì xảy ra khi gọi plugin
	}
};

// Lưu ý: Hàm onMessage, onCall có thể xài this.storage để truy cập datastore nhé!

