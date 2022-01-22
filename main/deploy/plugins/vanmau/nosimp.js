
module.exports = {
	keywords: ['nosimp','nosimppls'],

	name: 'Văn dùng để xoá bỏ từ simp',

	description: 'Duong',

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

	async onMessage(message, reply) {

    },

	async onCall(message, reply) {

		reply(`Cái từ "SIMP" nên được dẹp mẹ đi. Chỉ đơn giản là như này, đàn ông tôn trọng phụ nữ hoặc một ai đó tôn trọng người khác thì việc đó không cứ nên được cộp mác là "simp". Mấy thằng trẻ trâu ngày nay còn chả biết cách chùi đít nhưng nhiều lúc lại thích dùng mấy cái từ mà chả có nghĩa quái gì cả. Simp là dành cho một người đàn ông quá xem trọng một cô nàng nào đó và xem cô nàng tựa như vua chúa vậy. Từ khi nào mà việc thể hiện sự cảm thông, thân thiết và tôn trọng đối với một người phụ nữ lại được xem như là một hành vi simp vậy ? Cứ như thể việc thể hiện bất cứ thứ gì tôn trọng hoặc ngưỡng mộ đối với phái nữ thì đều được xem như là điều tồi tệ ấy. Thật sự là cái lòn què gì zậy ??? Tại sao việc ai đó quan tâm đến phái nữ lại làm phiền mấy người đến vậy cơ chứ ? Làm ơn hãy biết điều hơn và CÂM CÁI CON MẸ MỒM LẠI ĐI !!`);

	}
};
