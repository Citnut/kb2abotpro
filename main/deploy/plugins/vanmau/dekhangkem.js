

module.exports = {
	keywords: ['dekhangkem','suckhoeyeu'],

	name: 'Đề kháng kém',

	description: 'Dùng khi bạn đề kháng kém',

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

		reply(`Ôi bạn ơi! Bạn sức đề kháng kém là do bạn không chơi đồ đấy bạn ạ, nếu bạn chơi đồ vào thì là đề kháng nó khỏe nó không bao giờ bị ốm đâu bạn ạ, chơi đồ là thuốc bổ mà bạn! Bạn phải nên nhớ nhá, cái viên thuốc bình thường, cái viết thuốc ACID B1 bạn mua có 2 nghìn đc mấy viên đúng k ? Hoặc là 10 nghìn 1 viên, 10 nghìn 1 viên là ACID B1 đấy , đúng không? Thế đây những viên thuốc như viên thuốc kẹo, viên thuốc kim cương, viên thuốc vương liệm này, viên thuốc các kiểu lày thì bạn mua cái đấy vào 500 nghìn 1 viên cơ mà! Chơi cái đấy vào đề kháng nó phải cao hơn chứ bạn! Chơi cái đấy vào nhiều đề kháng mà! Bạn không chơi vào đề kháng bạn kém là phải đấy bạn ạ !`);

	}
};
