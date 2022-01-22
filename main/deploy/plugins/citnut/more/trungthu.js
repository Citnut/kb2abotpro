const { festival } = require("../func.js");

module.exports = {
	keywords: ["trungthu"],

	name: "đếm ngược đến trung thu",

	description: "plugin được làm bởi Citnut",
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
		if (setting.run.trungthu != true) {
			return reply("plugin này đã bị tắt")
		}else {
			const data = await festival("trungthu");
			const t = Date.parse(data) - Date.parse(new Date());
		    const seconds = Math.floor( (t/1000) % 60 );
	    	const minutes = Math.floor( (t/1000/60) % 60 );
	    	const hours = Math.floor( (t/(1000*60*60)) % 24 );
	    	const days = Math.floor( t/(1000*60*60*24) );

	    	fca.sendMessage(`「Tết Trung Thu rước đèn đi bay, em rước đèn bay khắp phố phường 😈🎇🌠」\n» ${days} ngày ${hours} tiếng ${minutes} phút ${seconds} giây «`, message.threadID, message.messageID)
			
			//fca.sendMessage(msg, message.threadID, message.messageID)
		}
	}
};
