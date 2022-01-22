const { getFile } = kb2abot.helpers;

const sentenses = [
	{
		body: "Điều ngọt ngào nhất",
		attachment: getFile("./main/deploy/plugins/citnut/data/thathinh/dieungotngao.mp3")
	},
	{
		body: "Em ơi gió lạnh gần kề",
		attachment: getFile("./main/deploy/plugins/citnut/data/thathinh/giolanh.mp3")
	},
	{
		body: "Em là cô gái có trái tim màu đỏ",
		attachment: getFile("./main/deploy/plugins/citnut/data/thathinh/emlacogai.mp3")
	},
	{
		body: "Em là nơi bình yên nhất",
		attachment: getFile("./main/deploy/plugins/citnut/data/thathinh/binhyen.mp3")
	},
	{
		body: "Hoa Hướng Dương là biểu tượng của Mặt Trời đó",
		attachment: getFile("./main/deploy/plugins/citnut/data/thathinh/hoahuongduong.mp3")
	},
	{
		body: "Toán hình được 2",
		attachment: getFile("./main/deploy/plugins/citnut/data/thathinh/hoctoanhinh.mp3")
	},
	{
		body: "Em đi đứng làm sao",
		attachment: getFile("./main/deploy/plugins/citnut/data/thathinh/hoiemdidung.mp3")
	},
	{
		body: "Kim là phải có chỉ nhaaa",
		attachment: getFile("./main/deploy/plugins/citnut/data/thathinh/kimvoichi.mp3")
	},
	{
		body: "Anh là con người đảm đang ~",
		attachment: getFile("./main/deploy/plugins/citnut/data/thathinh/naucom.mp3")
	},
	{
		body: "Làm gì có bồ đâu",
		attachment: getFile("./main/deploy/plugins/citnut/data/thathinh/nangdacomu.mp3")
	},
	{
		body: "Nuôi cá và trồng thêm rau",
		attachment: getFile("./main/deploy/plugins/citnut/data/thathinh/nhangian.mp3")
	},
	{
		body: "Sao em xinh thế?",
		attachment: getFile("./main/deploy/plugins/citnut/data/thathinh/nhinem.mp3")
	},
	{
		body: "Rượu ngon quên đi muộn sầu",
		attachment: getFile("./main/deploy/plugins/citnut/data/thathinh/ruoungon.mp3")
	},
	{
		body: "1 vòng trái đất anh gặp em",
		attachment: getFile("./main/deploy/plugins/citnut/data/thathinh/traidathinhtron.mp3")
	},
];

module.exports = {
	keywords: ["thathinh"],

	name: 'thả thính',

	description: 'plugin của Hoàng Hải Long, dịch sang kb2abot plugin bởi Citnut',

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

	hookType: 'non-command',

	async onMessage(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.autorun != true || message.senderID == this.storage.account.global.console.bot.id) {
		}else if (message.body.toLowerCase().indexOf("tha thinh") == 0 || message.body.toLowerCase().includes("thả thính")) {
			fca.sendMessage(sentenses[Math.floor(Math.random() * parseInt(sentenses.length))], message.threadID, message.messageID)
		}
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting;
		if (setting.run.thathinh != true) {
			return reply("plugin này đã bị tắt")
		}else {
			fca.sendMessage(sentenses[Math.floor(Math.random() * parseInt(sentenses.length))], message.threadID, message.messageID)
		}
	}
};
