const { getParam } = kb2abot.helpers;
const streamBuffers = require("stream-buffers");
const fetch = require("node-fetch");
//const setting = require("../setting.json");

module.exports = {
	name: "chị google",
	// Tên thân thiện của plugin (để hiển thị trong danh sách câu lệnh)
	keywords:["say", "voice"],
	// Là các từ khóa để gọi plugin voice (có thể có nhiều cái)

	description: "chuyển tin nhắn thành giọng nói :3",
	// Là nội dung của plugin (dùng để hiển thị trong hướng dẫn chi tiết)

	guide: "<tin nhắn>",
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
		if (setting.run.voice != true) {
			return reply("plugin này đã bị tắt")
		}else {
			const param = getParam(message.body);
			if (param){
				const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(param)}&tl=vi_VN&client=tw-ob`;
				let r = await fetch(url, {
					headers:{
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063"
				}});
				if (r.status == 200){
					let buf = await r.buffer();
					let file = new streamBuffers.ReadableStreamBuffer({frequency: 10, chunkSize: 2048});
					file.path = "tts.mp3", file.put(buf), file.stop();
					fca.sendMessage({attachment: file},	message.threadID, message.messageID)
				} else {
					fca.sendMessage("err", message.threadID, message.messageID);
				}
			}
		}
		// Được gọi khi có member xài lệnh của mình
		// Là cốt lõi của plugin không có phần này thì có nghĩa sẽ không có chuyện
		// gì xảy ra khi gọi plugin (để hideFromHelp true nữa là plugin như batman)
	}
}
