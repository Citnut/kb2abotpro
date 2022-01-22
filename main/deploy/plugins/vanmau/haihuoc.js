

module.exports = {
	keywords: ['haihuoc','chuahe'],

	name: 'Hài hước',

	description: 'Nói ai đó hài hước',

	guide: '<@mention>',

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

	async onMessage(message, reply) {},

	async onCall(message, reply) {
		
		const uidB = Object.keys(message.mentions)[0];
        const BName = message.mentions[Object.keys(message.mentions)[0]];
		if (!uidB) return reply('Không có ai để cảm ơn à ? ');
		const list_msg = [
            `Siêu hài hước, tôi đã cười sau khi đọc tin nhắn của bạn ${BName}, sau đó tôi đưa cho bạn bè tôi, hõ cũng cười, gọi tôi là cây hài của lớp, khi tôi đưa cho crush, ngay lập tức tài khoản của cô ấy biến thành chữ Người dùng Facebook, khi bị các chú cảnh sát giao thông gọi vào, tôi không xuất trình giấy tờ xe hay bằng lái, mà thay vào đó tôi đưa các chú tin nhắn của bạn, tôi đã được thả đi ngay sau khi nộp trà đá 500k cho các chú, khi bị gọi đi nghĩa vụ quân sự, tôi đã được miễn nghĩa vụ bằng cách đưa người ta xem tin nhắn của bạn, thật sự cảm ơn bạn rất nhiều, nhờ tin nhắn của bạn mà tôi không còn muốn tự tử vào mỗi tối, tôi cảm thấy bớt tự ti hơn vì ngoài xã hội kia vẫn còn nhiều thằng hài hước như mình, tôi thật sự cảm ơn vì tin nhắn của bạn đã cho tôi nhiều hơn là tiếng cười.`,
            `Xin chào ${BName}, tôi là nhà tuyển dụng của tập đoàn giải trí Rạp xiếc Trung Ương Group. Trong quá trình tìm kiếm và đào tạo những người hài hước của chúng tôi (đi săn chất xám và nhân tài) tôi nhận thấy bạn là người có khiếu hài hước, tập đoàn chúng tôi thật sự cần một chú hề đúng nghĩa, tôi đã thấy bạn vừa mở mồm là mọi người đã cười ầm lên, không cần phải biểu diễn. Đặc biệt đối với chúng tôi thì những vị trí lãnh đạo rạp xiếc cấp cao phải tìm người "có tâm, có tầm" Một môi trường của những thiên tài hề, xung quanh bạn là những nhân vật: cha đẻ của tiếng cười, nhà khoa học hề, chúa hề địa phương, bait đồ tể, chúa tể rạp xiết Môi trường làm việc năng động, hài hước`
            
        ];
        const ngoaitru = [
            '100014712121544', // TRUONG DANG DUONG 
            '100071547123898',
            '100048509610460'
        ];

        if (ngoaitru.includes(uidB)) {
        	reply(`bạn này không hài hước`)
        }else {
        	reply({
        		body: `${list_msg[Math.floor(Math.random()*(list_msg.length))]}`,
        		mentions: [
					{
						tag: `${BName}`,
						id: uidB
					}
				]
        	})
        }

	}
};
