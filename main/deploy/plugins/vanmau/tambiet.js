
module.exports = {
	keywords: ['tambiet','bye'],

	name: 'Tạm biệt',

	description: 'Tạm biệt một Idol',

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

		if (!uidB) return reply('Không có ai để tạm biệt à ? ');
		const list_msg = [
            `Tạm biệt ${BName}, khóc xong rồi thì thôi cất gọn poster anh vào góc, mình tạm thời không nhìn nhau anh nhé. Mỗi lần nhìn thấy anh em sợ lại làm tim mình đau hơn. Em không biết em có vượt qua cú sốc này không nữa. Chờ anh nửa năm, để rồi nhận trái đắng như vậy. Album đặt rồi cũng không muốn lấy về nữa. Em chưa đủ chín chắn để chấp nhận sự thật này, chắc là vậy, nên em đành ích kỷ vậy thôi. Chưa được 2 năm mà, anh có cần vội vã hẹn hò vậy không? Cắt đứt liên lạc với mọi người để không liên lụy tới họ nhưng vẫn hẹn hò được ạ? Em cảm thấy như bị lừa vậy, công sức lo lắng cho anh thừa rồi vì anh chắc vẫn luôn hạnh phúc bên ai kia. Vừa showcase gặp fan xong đã đi gặp bạn gái luôn, tình yêu của fan với anh chắc không đủ. Anh thừa biết fan girl là ntn mà 😭, vậy mà anh vẫn như vậy. Tạm biệt anh, cho em ích kỷ lần này nhé. Hẹn gặp lại khi em đã mạnh mẽ hơn, em không quay lưng đi nhưng em sẽ dừng lại.`,
            
        ];
        const ngoaitru = [
            '100014712121544', // TRUONG DANG DUONG 
            '100071547123898',
            '100048509610460'
        ];
        
		await reply({
			body: ngoaitru.includes(uidB) ?  `😾😼! ` : `${list_msg[Math.floor(Math.random()*(list_msg.length))]}` ,
			mentions: [
				{
					tag: `${BName}`,
					id: uidB
				}
			]
			
		});

	}
};
