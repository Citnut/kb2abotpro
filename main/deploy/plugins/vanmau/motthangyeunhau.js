
module.exports = {
	keywords: ['motthangyeunhau','1miunhau','1thangiunhau','1thangyeunhau','1myeunhau'],

	name: 'Kỷ niệm 1 tháng yêu nhau với 1 người bạn',

	description: '',

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
		if (!uidB) return reply('Không có ai để yêu à ? ');
		const list_msg = [
            `Chồng yêu ${BName} ơi, hôm nay là ngày 22/5 rồi này. Tròn một tháng chúng mình yêu nhau. Ba mươi ngày yêu, chồng biết không 30 ngày không phải là thời gian dài nhưng vợ hạnh phúc biết nhường nào chồng ạ. Hạnh phúc vì tất cả. Hạnh phúc vì được ở bên chồng này, hạnh phúc được nghe những lời yêu thương từ chồng, hạnh phúc lắm, ngày ngày được chồng quan tâm, được chồng lo lắng, ngày ngày được chồng nhắc nhở uống thuốc, nhắc nhở học bài, nhắc nhở đi ngủ sớm nữa. Thích lắm ạ. Hạnh phúc là được khi khi được nghe chồng nói yêu em , yêu em nhiều lắm, em thích lắm. Lúc chồng gọi em là "Tròn ơi, anh bảo này". Sao chồng gọi vợ với nhiều biệt danh như thế "nào là vợ Tròn, sữa chua yêu ??, vợ Hăm, vợ Hấp, rồi nhiều lúc lại còn bà Tiên, kho báu. Song những lúc cãi nhau chúng mình lại còn ông với bà. Vợ thích lắm lúc chồng cười nhớ và hạnh phúc hơn nữa khi nụ cười ấy dành cho vợ. Hihi những những gì em có là bố mẹ em cho, còn cái hạnh phúc to to là do chồng mà có. Chồng ơi chồng có vui không, chồng có hạnh phúc không khi có em, khi được ở bên em và em biết là có mà. Những gì... À chồng này 1 tháng 2 tháng 3 tháng chả mấy chốc mà mười năm đâu, mình hãy cùng nắm tay nhau cùng nắm tay nhau đi hết con đường phía trước rồi ừm và mãi hạnh phúc chồng nhé. Em gửi nắng gửi gió để nói lói lày những lọ những lời này với chồng để chồng biết rằng Em yêu chồng nhiều lắm. I love you chiu chiu`,
            
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
