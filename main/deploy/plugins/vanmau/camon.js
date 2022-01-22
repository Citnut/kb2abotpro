module.exports = {
	keywords: ['camon','thank'],

	name: 'Cảm ơn ',

	description: 'Cảm ơn một người bạn',

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
            `Bạn ơi bạn à , này bạn ${BName} ơi bạn ơi , mình cảm ơn bạn nhé , mình rất là cảm ơn bạn luôn , gửi bạn một lời cảm ơn chân thành này , mong bạn có một ngày mới tốt lành bạn nhé , chúc bạn vui vẻ , cảm ơn bạn ! 😍`,
            
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
