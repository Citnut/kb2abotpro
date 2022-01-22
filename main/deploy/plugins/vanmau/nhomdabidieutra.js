
module.exports = {
	keywords: ['nhomdabidieutra', 'dieutra'],

	name: 'Nhóm đã bị điều tra',

	description: 'Dùng để doạ',

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

	async onLoad() {},

	hookType: 'none',

	async onMessage(message, reply) {

    },

	async onCall(message, reply) {

		reply(`Nhóm này đã bị điều tra bởi các cơ quan trực thuộc Bộ Công an (và/hoặc các tổ chức chính trị tương tự phục vụ cho nhà nước CHXHCNVN). Cơ quan điều tra (CQĐT) khẳng định các thành viên trong này liên quan tới nhóm hoặc những cá nhân khác trong đây. CQĐT biết rõ tại sao các thành viên lại có mặt ở đây vào thời điểm này, tài khoản của họ không được thêm bởi một bên thứ ba mà chính họ tự tham gia vào đây. Các nhân viên của CQĐT cũng xin khẳng định rằng những hành động chống phá Đảng và Nhà nước đã được thực hiện bởi các thành viên trong nhóm này. Nhà nước CHXHCNVN cũng không quên khẳng định quyết tâm chiến thắng đại dịch Covid-19, nhấn mạnh chủ quyền không thể tranh cãi với quần đảo Hoàng Sa và Trường Sa, cũng như tính chính nghĩa của cuộc chiến giải phóng người dân Campuchia khỏi thảm họa diệt chủng Khmer Đỏ.`);

	}
};
