const axios = require("axios");
const fetch = require("node-fetch");
const streamBuffers = require("stream-buffers");
const { round, random } = kb2abot.helpers;
//const setting = require("../setting.json");
module.exports = {

	name: "ảnh gái 2k7 2020/2021",
	// Tên thân thiện của plugin (hiển thị trong danh sách câu lệnh)

	keywords: ["gai2k7", "gaik7", "girl2k7", "girlk7", "2k7", "k7"],
	description: "plugin này dùng api gái 2k7 của Citnut.",
	// Nội dung của plugin (hiển thị trong hướng dẫn chi tiết)
	extendedDescription: "",
	guide: "",

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
		if (setting.run.gai != true) {
			return reply("plugin này đã bị tắt")
		}else {
			let res = await axios.get("https://raw.githubusercontent.com/Citnut/Citnut/main/adu.json");

			let citngu = res.data;
			
			let r = await fetch(`${citngu.data[round(random(0, (citngu.link)), 0)]}`);
			let body = citngu.message[round(random(0, (citngu.cap)), 0)];
			if (r.status == 200) {
				let buf = await r.buffer();
				let attachment = new streamBuffers.ReadableStreamBuffer({frequency: 10, chunkSize: 1024});
				attachment.path = `img.jpg`, attachment.put(buf), attachment.stop();
				fca.sendMessage({body, attachment}, message.threadID, message.messageID)
			}else {
				fca.sendMessage(`không thể tải ảnh` , message.threadID, message.messageID);
				console.newLogger.error(`[⬢PLUGIN] không thể tải ảnh`)
			}
		}
		// Được gọi khi có member xài lệnh của mình
		// Là cốt lõi của plugin không có phần này thì có nghĩa sẽ không có chuyện
		// gì xảy ra khi gọi plugin (để hideFromHelp true nữa là plugin như batman)
	}
};