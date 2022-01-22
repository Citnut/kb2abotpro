

module.exports = {
	keywords: ['totinh'],

	name: 'Tỏ tình ai đó ',

	description: 'Cơm chó online',

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
		

		const uidA = message.senderID;
		const uidB = Object.keys(message.mentions)[0];
        const BName = message.mentions[Object.keys(message.mentions)[0]];
        const AName = 'anh';
		if (!uidB) return reply('Không có ai để tỏ tình à ? Gàe');
		const list_msg = [
            `Trong trường hợp ${AName} bị say đắm bởi vẻ đẹp quyến rũ của em - ${BName} (hoặc những vẻ đẹp tương tự của em), anh khẳng định anh không liên hệ bởi bất cứ một cô gái khác nào trong nhóm này, có lẽ trái tim của anh chỉ dành cho em. Anh cũng xin khẳng định anh không hề có thể yêu một cô gái nào khác khi đã yêu em..`,
            
        ];
        const ngoaitru = [
            '100014712121544', // TRUONG DANG DUONG 
            '100071547123898',
            '100048509610460'
        ];
        
        if (ngoaitru.includes(uidB)) {
        	reply({
        		body: `${BName} không thích cơm chó nhá, nhớ đấy ĐM!`,
        		mentions: [{
        			tag: `${BName}`,
					id: uidB
        		}]
        	})
        }else {
        	reply({
        		body: `${list_msg[Math.floor(Math.random()*(list_msg.length))]}`,
        		mentions: [
					{
						tag: `${BName}`,
						id: uidB
					},
	                {
						tag: `${AName}`,
						id: uidA
					}
				]
        	})
        }
	}
};
