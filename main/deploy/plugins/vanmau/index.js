const {sendMessage} = kb2abot.helpers.fca;
const {getInstructor} = kb2abot.helpers;

const childs = [
	'totinh',
    'camon',
    'ctcht',
    'nosimp',
    'xindungcainhau',
    'tambiet',
    'motthangyeunhau',
	'tretrau',
	'yeusom',
	'dekhangkem',
	'haihuoc',
	'nhomdabidieutra'
    // 'ongtorapper'
//	'meme'
];

module.exports = {
	keywords: ['vanmau'],

	name: 'Văn mẫU Cực Mạnh',

	description: 'Các đoạn văn mẫu siêu hay',

	guide: '',

	childs,

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
		reply(getInstructor('VanMau plugins', childs));
	}
};
