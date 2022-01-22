const { /*get helper functions or somthing idk :|*/ } = kb2abot.helpers[''];

module.exports = {
	keywords: ['sample'], // (*unique)
	// keywords[0] phải là duy nhất (unique) để phân biệt với các plugin khác!
	// Các từ khóa để gọi plugin sample (có thể có nhiều keyword)
	// Ví dụ keyword 'test' thì khi có người nhắn /test là plugin được gọi

	name: 'sample',
	// Tên ngắn gọn của plugin

	description: 'This plugin is awesome!',
	// Nội dung của plugin (hiển thị trong hướng dẫn chi tiết)

	guide: '',
	// Hướng dẫn sử dụng của plugin
	// Phần này được nối đuôi sau từ '/sample ' nên chú ý nhé

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
		// Được gọi khi có member xài lệnh plugin này
		// Là cốt lõi của plugin không có phần này thì có nghĩa sẽ không có chuyện
		// gì xảy ra khi gọi plugin
	}
};

// Lưu ý: Hàm onMessage, onCall có thể xài this.storage để truy cập datastore nhé!

