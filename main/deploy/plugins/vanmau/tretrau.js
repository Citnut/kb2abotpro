

module.exports = {
	keywords: ['tretrau','trautre'],

	name: 'Trẻ trâu',

	description: 'Nói trẻ trâu tới 1 bạn',

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
  
		if (!uidB) return reply('Không có ai để nói trẻ trâu à ? Thằng trẻ trâu ');
		const list_msg = [
            `xin lỗi nhưng mình tò mò quá nên có vào fb của bạn ${BName} xem qua, mình thấy bạn hơi trẻ trâu, có vẻ giống mình của 4,5 năm trước nên mình hiểu, hiện tại thì chắc là do bạn chưa biết cách hoà đồng với mọi người, cái này thì đơn giản thôi, bạn cứ nhiệt tình giúp đỡ mọi người, bất kể việc gì nếu nó nằm trong khả năng của bạn, nhưng coi trừng kẻo bị lợi dụng, và không cần nhất thiết phải chơi với mọi người, chỉ cần tìm vài ba đứa bạn thân để chơi là được rồi, chúc bạn sớm hoà nhập được với cộng đồng`,
            
        ];
        const ngoaitru = [
            '100014712121544', // TRUONG DANG DUONG 
            '100071547123898',
            '100048509610460'
        ];
        
		await reply({
			body: ngoaitru.includes(uidB) ?  `Bạn này không hề trẻ trâu tí nào😾😼! ` : `${list_msg[Math.floor(Math.random()*(list_msg.length))]}` ,
			mentions: [
				{
					tag: `${BName}`,
					id: uidB
				}
			]			
		});

	}
};
