//const { getFile, round, random } = kb2abot.helpers;
const axios = require("axios");
const fetch = require("node-fetch");
const streamBuffers = require("stream-buffers");

module.exports = {
	keywords: ["muaquatpro", "muaquat", "fandance"], // (*unique)
	// keywords[0] phải là duy nhất (unique) để phân biệt với các plugin khác!
	// Các từ khóa để gọi plugin muaquatpro (có thể có nhiều keyword)
	// Ví dụ keyword 'test' thì khi có người nhắn /test là plugin được gọi

	name: 'múa quạt pro vip',
	// Tên ngắn gọn của plugin

	description: 'plugin được làm bởi Citnut',
	// Nội dung của plugin (hiển thị trong hướng dẫn chi tiết)

	guide: '',
	// Hướng dẫn sử dụng của plugin
	// Phần này được nối đuôi sau từ '/muaquatpro ' nên chú ý nhé

	childs: [],
	// Các lệnh con của file này (nếu file này keywords[0] là 'test0' và childs là ['test1']
	// thì khi người dùng nhập /test0.test1 hoặc /test1 thì nó sẽ chạy lệnh trong file test1.js)
	// Quy tắc viết như hàm require('<here>') của nodejs
	// VD: ['./index', 'index.js', 'folder']

	permission: {
		'*': '*'
	},
	// Bên trái là threadID (vd: '3026469720745071'), lưu ý: '*' có nghĩa là tất cả thread
	// Bên phải là quyền sử dụng, có thể là:
	// '*' : Mọi người
	// 'admin' : Chỉ admin
	// ['100007723935647', '100026785898608'] : Một số id user chỉ định (luôn là String nhé)
	// Nếu bên phải để [] thì có nghĩa sẽ không ai được xài

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
	// Thiết kế datastore cho plugin (hơi giống Schema), chuẩn bị trước để tránh lỗi undefined
	// Datastore đã lưu sẽ kế thừa design này
	// account.global: Toàn cục tài khoản
	// account.local: Cục bộ tài khoản
	// thread.global: Toàn cục thread (box)
	// thread.local: Cục bộ thread (box)

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
		if (setting.run.muaquat != true) {
			return reply("plugin này đã bị tắt")
		}else {
			let res = await axios.get("https://raw.githubusercontent.com/Citnut/Citnut/main/muaquat.json");
			let url = res.data[Math.floor(Math.random() * parseInt(res.data.length))]
			let r = await fetch(url);
			if (r.status == 200) {
				let buf = await r.buffer();
				let vid = new streamBuffers.ReadableStreamBuffer({frequency: 10, chunkSize: 1024});
				vid.path = "muaquat.mp4", vid.put(buf), vid.stop();
				fca.sendMessage({attachment: vid}, message.threadID, message.messageID)
			}else {
				fca.sendMessage("không thể tải video!", message.threadID, message.messageID);
				console.newLogger.error(`không thể tải video! url: ${url} status: ${r.status}`)
			}
		}
		// Được gọi khi có member xài lệnh plugin này
		// Là cốt lõi của plugin không có phần này thì có nghĩa sẽ không có chuyện
		// gì xảy ra khi gọi plugin
	}
};

// Lưu ý: Hàm onMessage, onCall có thể xài this.storage để truy cập datastore nhé!

