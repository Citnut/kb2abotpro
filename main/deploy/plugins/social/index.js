const {sendMessage} = kb2abot.helpers.fca;
const {getInstructor} = kb2abot.helpers;

const childs = [
	'gift',
	'goodnight',
	'hpbd',
	'kill',
	'kiss',
	'marry',
	'punch',
	'seophi',
	'shower',
	'sus'
];

module.exports = {
	keywords: ['social'],

	name: 'social',

	description: 'xã hội',

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
		reply(getInstructor('Social plugins', childs));
	}
};
