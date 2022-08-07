const {getInstructor} = kb2abot.helpers;

global.api = {
	gai: "https://imgs-api.herokuapp.com/girl?apikey=mk002",
	upt: "https://imgs-api.herokuapp.com/girl?apikey=mk002",
	cadao: "https://manhict.tech/cadaovn"
};

const childs = [
	//'img/boy',
	'img/girl',
	//'img/cosplay',
	//'img/fox',
	//'img/jimmy',
	'vid/muaquatpro',
	'vid/hacker',
	'more/tinhtam',
	//'more/adminbot',
	'more/adduser',
	'more/cadao',
	'more/uid',
	//'more/calendar',
	'more/voice',
	//'more/trungthu',
	//'more/tet',
	//'more/tetthieunhi',
	//'more/cathangtu',
	'eco/pay',
	'eco/work',
	'eco/slut',
	'eco/crime',
	'eco/fishing',
	// 'console',
	'func',
	'unsend',
	'uptime',
	'noprefix/thathinh',
	'noprefix/aothatday',
	'noprefix/botngu',
	'noprefix/concainit',
	'noprefix/dongu',
	'noprefix/vinhbiet',
	'noprefix/happybirthd',
	'noprefix/vovanhoa',
	'noprefix/trieu',
	//'noprefix/hao',
	'noprefix/banlanhat',
	'noprefix/he',
	'noprefix/oibanoi',
	'noprefix/thunglung',
	'noprefix/uwu',
	'noprefix/congiap',
	//'noprefix/DAT',
	'noprefix/kohieu'
];
module.exports = {
	keywords: ['ℂ𝕀𝕋ℕ𝕌𝕋', 'CITNUT', 'citnut'],

	name: 'Citnut plugins',

	description: 'Official Citnut plugins',

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
	async onLoad() {
	},

	hookType: 'none',

	async onMessage(message, reply) {

		if (this.storage.account.global.botId) return
		this.storage.account.global.botId = await fca.getCurrentUserID()

		
	},

	async onCall(message, reply) {
		reply(getInstructor('CITNUT ⭐', childs));
	}
};
