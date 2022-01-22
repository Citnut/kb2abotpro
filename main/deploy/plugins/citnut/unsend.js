module.exports = {
	keywords: ['gỡ'], 

	name: 'gỡ tin nhắn của bot',

	description: 'để xóa 1 tin nhắn của bot, phản hồi (reply) tin nhắn cần gỡ bằng từ khóa gỡ',

	guide: '',

	childs: [],

	permission: {
		'*': 'SUPER_ADMINS'
	},
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

	async onLoad() {},

	hookType: 'non-command',

	async onMessage(message, reply) {
		if (message.type == "message_reply" && message.body == "gỡ") {
			if (message.messageReply.senderID == fca.getCurrentUserID()) {
				fca.unsendMessage(message.messageReply.messageID)
			}
		}		
	},

	async onCall(message, reply) {
		reply(`để xóa 1 tin nhắn của bot, phản hồi (reply) tin nhắn cần gỡ bằng từ khóa gỡ`)
	}
};

