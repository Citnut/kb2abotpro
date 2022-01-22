const { getParam, round, random } = kb2abot.helpers,
	//{ getUserInfo } = kb2abot.helpers.fca,
	listItem = require("../data/cauca/item.json"),
	listFish = require("../data/cauca/data.json");
let msg = {
	shop: `「 Fishing Shop 」\nHãy phản hồi (reply) tin nhắn này bằng một trong những số sau\n\n💵 1/ mua vật phẩm\n📤 2/ bán vật phẩm\n🏠 3/ về nhà`,
	inventory: `「 Inventory 」\nHãy phản hồi (reply) tin nhắn này bằng một trong những số sau\n\n📜 1/ kiểm tra cần câu\n📦 2/ mở túi đồ`,		
	home: `「 Home 」\nHãy phản hồi (reply) tin nhắn này bằng một trong những số sau\n\n📤 1/ Nâng cấp túi đồ\n🧰 2/ Sửa chữa cần câu của bạn`		
};

async function getRarityRecursion () {
    const map = {
        'VeryCommon': 39,
        'Common': 29,
        'Uncommon': 22,
        'Rare': 7,
        'VeryRare': 3
    };
    const rarityList = [
        'Very Common',
        'Common',
        'Uncommon',
        'Rare',
        'Very Rare'
    ];
    let rarityMap = [];
    let totalMap = map.VeryCommon + map.Common + map.Uncommon + map.Rare + map.VeryRare;

    for (let i = 0; i <= totalMap; i++) {
    	if (i <= map.VeryCommon) {
    		rarityMap.push("Very Common")
    	};
    	if (map.VeryCommon < i <= (map.VeryCommon + map.Common)) {
    		rarityMap.push("Common")
    	};
    	if ((map.VeryCommon + map.Common) < i  <= (map.VeryCommon + map.Common + map.Uncommon)) {
    		rarityMap.push("Uncommon")
    	};
    	if ((map.VeryCommon + map.Common + map.Uncommon) < i  <= (map.VeryCommon + map.Common + map.Uncommon + map.Rare)) {
    		rarityMap.push("Rare")
    	};
    	if ((map.VeryCommon + map.Common + map.Uncommon + map.Rare) < i) {
    		rarityMap.push("Very Rare")
    	}
    };
    let newRarityMap = rarityMap.sort(() => Math.random() - 0.5);
    return newRarityMap[round(random(0, totalMap), 0)]
};
module.exports = {
	keywords: ['fishing'], 
	name: 'câu cá :)))',
	description: 'lại là một plugin thông não được remake bởi Citnut',
	guide: 'register|shop|inventory',
	childs: [],
	permission: { '*': '*' },
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
	async onLoad() { },
	hookType: 'non-command',
	async onMessage(message, reply) {
		if (message.type != "message_reply" || isNaN(message.body)) return;
		const { body, senderID, messageReply } = message;
		let stg = this.storage.account.global,
			prefix = this.storage.thread.global.prefix;
			//money = this.storage.account.global.eco[senderID].money;
		if (!this.storage.account.global.fishing_) { this.storage.account.global.fishing_ = {} };
		if (!this.storage.account.global.fishing_[senderID]) { this.storage.account.global.fishing_[senderID] = {} };
		if (!this.storage.account.global.fishing_[senderID].register) return;
		let data = this.storage.account.global.console;
		let menuShop = [];
		for (let i = 0; i < listItem.length; i++) {
			menuShop.push(`❯ ${i + 1}/ ${listItem[i].name}: ${listItem[i].price}💵 - Độ bền: ${listItem[i].durability}`)
		};
		if (messageReply.senderID != data.bot.id) return;
		let msga = {
			buy: `「 Fishing Shop 」\nHãy phản hồi (reply) tin nhắn này bằng một trong những số sau\n\n${menuShop.join("\n")}`,
			bag: `[ Fishing Upgrage ] Hiện tại bạn đang có ${this.storage.account.global.fishing_[senderID].inventory.length + 1} vị trí có thể chứa đồ\nĐể mua thêm vị trí chứa đồ, bạn hãy phản hồi (reply) tin nhắn này số lượng vị trí bạn muốn mua!`
		};
		if (!Object.values(msg).includes(messageReply.body) && !Object.values(msga).includes(messageReply.body)) return;
		let name = data[message.senderID].toUpperCase();
		
		
		switch (messageReply.body) {
			case msg.shop:
				switch (body) {
					case "1":
						return reply(msga.buy)
					break;
					case "2":
						try {
							if (this.storage.account.global.fishing_[senderID].inventory[0].name == "Empty") return reply(`bạn không có con cá nào để bán!`);
							let total = index = 0;
							for (item of this.storage.account.global.fishing_[senderID].inventory) {
								total += item.price;
								this.storage.account.global.fishing_[senderID].inventory[index] = {
	                                name: "Empty",
	                                size: 0.0,
	                                price: 0
	                            };
	                            index++
							};
							this.storage.account.global.eco[senderID].money += total;
							return reply(`💳 số tài khoản: ${senderID}\n💳 giao dịch: +${total}💵\n💳 nội dung: ${name} BÁN CÁ\n💳 số dư chính: ${this.storage.account.global.eco[senderID].money}💵`)
						} catch (e) {
							console.error(e);
							return reply(`đã xảy ra lỗi`)
						}
					break;
					case "3":
						return reply(msg.home)
					break;
					default:
						return reply(`lựa chọn của bạn không có trong danh sách!`);
					break
				}
			break;
			case msg.inventory:
				switch (body) {
					case "1":
						if (!this.storage.account.global.fishing_[senderID].fishingrod.name) { return reply(`bạn chưa có cần câu.\n\nTIP: Để đến cửa hàng hãy dùng lệnh ${prefix}fishing shop`) };
						return reply(`「 Inventory 」\nBạn đang sở hữu ${this.storage.account.global.fishing_[senderID].fishingrod.name}\nĐộ bền: ${this.storage.account.global.fishing_[senderID].fishingrod.durability}/${this.storage.account.global.fishing_[senderID].fishingrod.needfix*2}\n\nTIP: ${(this.storage.account.global.fishing_[senderID].fishingrod.durability>this.storage.account.global.fishing_[senderID].fishingrod.needfix)?("cần câu của bạn nên được sửa chữa"):"cần câu của bạn còn mới"}`)
					break;
					case "2":
						let listInv = [], invMsg = ``, _index = 1;
						for (let i = 0; i < this.storage.account.global.fishing_[senderID].inventory.length; i++) {
							if (this.storage.account.global.fishing_[senderID].inventory[i].name != "Empty") {
								listInv.push(`${_index}/ ${this.storage.account.global.fishing_[senderID].inventory[i].name}: ${this.storage.account.global.fishing_[senderID].inventory[i].size}cm | ${this.storage.account.global.fishing_[senderID].inventory[i].price}💵`);
								_index += 1
							}
						};
						if (listInv.length == 0) { return reply(`túi của bạn chưa có con cá nào`) };
						return reply(`「 Inventory 」\n${listInv.join(`\n`)}\n「 KB2ABOT 」`)
					break;
					default:
						return	reply(`lựa chọn của bạn không có trong danh sách!`);
					break
				}
			break;
			case msga.buy:
				try {
					if (body > listItem.length || body < 1) { return reply(`lựa chọn của bạn không tồn tại!`) };
					let choose = listItem[parseInt(body) - 1];
					if (this.storage.account.global.eco[senderID].money < choose.price) { return reply(`bạn không đủ tiền để mua nó\n\nbạn còn thiếu: ${choose.price - this.storage.account.global.eco[senderID].money}💵`) };
					this.storage.account.global.fishing_[senderID].fishingrod.name = choose.name;
					this.storage.account.global.fishing_[senderID].fishingrod.time = choose.time;
					this.storage.account.global.fishing_[senderID].fishingrod.durability = choose.durability;
					this.storage.account.global.fishing_[senderID].fishingrod.needfix = choose.fix;
					this.storage.account.global.fishing_[senderID].fishingrod.fix = choose.price / 2;
					this.storage.account.global.eco[senderID].money -= choose.price;
					return reply(`💳 số tài khoản: ${senderID}\n💳 giao dịch: -${choose.price}💵\n💳 nội dung: ${name} MUA ${choose.name.toUpperCase()}\n💳 số dư chính: ${this.storage.account.global.eco[senderID].money}💵`)
				} catch (e) {
					console.error(e);
					return reply(`đã xảy ra lỗi`)
				}
			break;
			case msg.home:
				switch (body) {
					case "1":
						return reply(msga.bag)
					break;
					case "2":
						if (this.storage.account.global.fishing_[senderID].fishingrod.durability > this.storage.account.global.fishing_[senderID].fishingrod.needfix) { return reply(`cần câu của bạn chưa cần sửa chữa`) };
						if (this.storage.account.global.eco[senderID].money < this.storage.account.global.fishing_[senderID].fishingrod.fix) { return reply(`bạn không đủ tiền để sửa cần câu\n\nbạn còn thiếu: ${this.storage.account.global.fishing_[senderID].fishingrod.fix - money}💵`) };
						this.storage.account.global.fishing_[senderID].fishingrod.durability = this.storage.account.global.fishing_[senderID].fishingrod.needfix*2;
						this.storage.account.global.eco[senderID].money -= this.storage.account.global.fishing_[senderID].fishingrod.fix;
						return reply(`💳 số tài khoản: ${senderID}\n💳 giao dịch: -${this.storage.account.global.fishing_[senderID].fishingrod.fix}💵\n💳 nội dung: ${name} SỬA CẦN CÂU\n💳 số dư chính: ${money}💵`)
					break;
					default:
						return reply(`lựa chọn của bạn không có trong danh sách!`);
					break
				}
			break;
			case msga.bag:
				if (body < 0) { return reply(`lựa chọn của bạn không phải là một số âm!`) };
				const updatePrice = parseInt(body)*2000;
				let cost = this.storage.account.global.eco[senderID].money - updatePrice;
				if (cost < 0) { return reply(`bạn không đủ tiền\n\nbạn còn thiếu: ${cost*-1}💵`)};
				for (let i = 0; i < parseInt(body) - 1; i++) {
					this.storage.account.global.fishing_[senderID].inventory.push({
						name: "Empty",
					    size: 0.0,
					    price: 0
					})
				};
				this.storage.account.global.eco[senderID].money = cost;
				return reply(`💳 số tài khoản: ${senderID}\n💳 giao dịch: -${updatePrice}💵\n💳 nội dung: ${name} NÂNG CẤP TÚI ĐỒ\n💳 số dư chính: ${this.storage.account.global.eco[senderID].money}💵`)
			break;
			default:
			break
		}
	},

	async onCall(message, reply) {
		const { body, senderID } = message;
		let stg = this.storage.account.global,
			setting = this.storage.account.global.citSetting,
			prefix = this.storage.thread.global.prefix;
			//money = this.storage.account.global.eco
		if (!stg.fishing_) { stg.fishing_ = {} };
		if (!stg.fishing_[senderID]) { stg.fishing_[senderID] = {} };
		//if (!money) { money = {} };
		//let	this.storage.account.global.fishing_[senderID] = stg.fishing_[senderID];
		
		if (setting.run.fishing != true) { return reply(`plugin này đã bị tắt`) };

		switch (getParam(body)) {
			case "register":
			case "r":
				try {
					if (this.storage.account.global.fishing_[senderID].register) { return reply(`bạn đã đăng kí tham gia trò chơi rồi!`) };
					let fishy = {};
					fishy.fishingrod = {};
					fishy.inventory = [];
					for (let i = 0; i < 9; i++) {
						fishy.inventory.push({
							name: "Empty",
					        size: 0.0,
					        price: 0
						})
					};
					fishy.lastTime = fishy.point = fishy.totalCatch = 0;
					fishy.register = true;
					this.storage.account.global.fishing_[senderID] = fishy;
					return reply(`bạn đã đăng kí tham gia trò chơi thành công!`)
				} catch (e) {
					console.error(e);
					return reply(`đã xảy ra lỗi`)
				}
			break;
			case "shop":
			case "s":
				try {
					if (!this.storage.account.global.fishing_[senderID].register) { return reply(`bạn chưa đăng kí tham gia trò chơi.\nTIP: Để tham gia, hãy dùng lệnh ${prefix}fishing register`) };
					return reply(msg.shop)
				} catch (e) {
					console.error(e);
					return reply(`đã xảy ra lỗi`)
				}
			break;
			case "inventory":
			case "inv":
				try {
					if (!this.storage.account.global.fishing_[senderID].register) { return reply(`bạn chưa đăng kí tham gia trò chơi.\nĐể tham gia, hãy dùng lệnh ${prefix}fishing register`) };
					return reply(msg.inventory)
				} catch(e) {
					console.error(e);
					return reply(`đã xảy ra lỗi`)
				}
			break;
			default:
				try {
					if (!this.storage.account.global.fishing_[senderID].register) { return reply(`bạn chưa đăng kí tham gia trò chơi.\nĐể tham gia, hãy dùng lệnh ${prefix}fishing register`) };
					//const dateNow = moment().tz("Asia/Ho_Chi_minh"),
                	const format = new Intl.NumberFormat();
                	if (!this.storage.account.global.fishing_[senderID].fishingrod.name) { return reply(`bạn chưa có cần câu, hãy mua cần câu nhá.\nTIP: Để đến cửa hàng hãy dùng lệnh ${prefix}fishing shop`) };
                	if (this.storage.account.global.fishing_[senderID].fishingrod.durability <= 0) { return reply(`🧰 cần câu của bạn đã hỏng, hãy sửa nó hoặc mua mới 🧰`) };
                	if (new Date().getTime() < this.storage.account.global.fishing_[senderID].lastTime + (this.storage.account.global.fishing_[senderID].fishingrod.time*1000)) { 
                		let cooldown = (this.storage.account.global.fishing_[senderID].lastTime + (this.storage.account.global.fishing_[senderID].fishingrod.time*1000)) - new Date().getTime();
                		return reply(`⏳ bạn cần đợi thêm ${round(cooldown/1000)} giây nữa để cá xuất hiện ⏳`) };
					if (this.storage.account.global.fishing_[senderID].inventory[this.storage.account.global.fishing_[senderID].inventory.length - 1].name != "Empty") { return reply(`túi đồ của bạn đã hết chỗ trống`) };

					const fishRarity = await getRarityRecursion();
					let currentHour = new Date().getHours();
                    let currentMonth = new Date().getMonth();

					let fishData = [];
                    for (let i = 0; i < listFish.length; i++) {
                        if (listFish[i].rarity.includes(fishRarity) && listFish[i].time.includes(currentHour) && listFish[i].months.includes(currentMonth)) {
                            fishData.push(listFish[i])
                        }
                    };
                    if (!fishData[0]) { return reply(`🤷‍♀️ hiện tại không còn cá để câu, hãy đợi một lúc và thử lại nha 🤷‍♀️`) };

                    let caught = fishData[Math.floor(Math.random() * parseInt(fishData.length))];
                    caught.size = (typeof caught.size != "array") ? caught.size : (Math.random() * (caught.size[1] - caught.size[0]) + caught.size[0]).toFixed(1);
                    this.storage.account.global.fishing_[senderID].fishingrod.durability -= 1;
                    this.storage.account.global.fishing_[senderID].lastTime = new Date().getTime();
                    this.storage.account.global.fishing_[senderID].totalCatch += 1;
                    this.storage.account.global.fishing_[senderID].point += caught.price;
                    for (let i = 0; i < this.storage.account.global.fishing_[senderID].inventory.length; i++) {
                    	if (this.storage.account.global.fishing_[senderID].inventory[i].name == "Empty") { this.storage.account.global.fishing_[senderID].inventory[i] = caught; i = this.storage.account.global.fishing_[senderID].inventory.length }
                    };

                    return reply(`=== Bạn đã câu được: ${caught.name} ===\n\n🔎 Kích thước: ${caught.size} cm 🔍\n🎆 Độ hiếm: ${caught.rarity} 🎆\n💵 giá bán: ${format.format(caught.price)}💵`)
				} catch(e) {
					console.error(e);
					return reply(`đã xảy ra lỗi`)
				}
			break
		}
	}
}
