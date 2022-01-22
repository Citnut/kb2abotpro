const axios = require("axios");
const fetch = require("node-fetch");
const streamBuffers = require("stream-buffers");
//const setting = require("../setting.json");

module.exports = {
	keywords: ["trai", "boy"],
	name: "trai",
	description: ".",
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
	hookType: "*",

	async onMessage(message, reply) {
		// Được gọi mỗi khi có message nhắn tới (kể cả khi dùng lệnh)
		// Chủ yếu dùng để làm mấy plugin kiểu gián điệp hoặc game
		// Xử lí mọi tin nhắn mà không cần prefix
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.boy != true) {
			return reply("plugin này đã bị tắt")
		}else {
			const res = await axios.get(`https://api.vangbanlanhat.tk/image?type=trai`);

			let r = await fetch(res.data.data);
			if (r.status == 200) {
				let buf = await r.buffer();
				let img = new streamBuffers.ReadableStreamBuffer({frequency: 10, chunkSize: 1024});
				img.path = "boy.jpg", img.put(buf), img.stop();
				fca.sendMessage({attachment: img}, message.threadID, message.messageID)
			}else {
				fca.sendMessage("không thể tải ảnh!", message.threadID, message.messageID);
				console.newLogger.error(`không thể tải ảnh! url: ${res.data.data} status: ${r.status}`)
			}
		}
		// Được gọi khi có member xài lệnh của mình
		// Là cốt lõi của plugin không có phần này thì có nghĩa sẽ không có chuyện
		// gì xảy ra khi gọi plugin (để hideFromHelp true nữa là plugin như batman)
	}
};
