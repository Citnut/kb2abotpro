const { getParam, round, random } = kb2abot.helpers,
      { handleMessage, handleReply } = require("../index.js");

let dataItems = require("../data/cauca/item.json"),
    dataFish = require("../data/cauca/data.json"),
    citnut = {
        loihethong: "[Fishing] Hiện tại không thể câu cá vì đã xảy ra lỗi hệ thống, vui lòng thử lại sau hoặc đợi thông báo!",
        loidk: "[Fishing] Hiện tại không thể đăng ký vì đã xảy ra lỗi hệ thống, vui lòng thử lại sau hoặc đợi thông báo!",
        //isNa: "[Fishing Shop] Lựa chọn của bạn không phải là một con số!",
        listkoco: "[Fishing Shop] Lựa chọn của bạn không có danh sách",
        kodutien: "[Fishing Shop] Bạn không đủ tiền để có thể mua cần câu mới",
        koam: "[Fishing Shop] Lựa chọn của bạn không phải là số âm!"
    };

async function handleReaction (data, fca, event, strg) {
    if (data.author != event.userID) return;
    if (!strg.fishy) { strg.fishy = {} };
    if (!strg.fishy[event.userID]) { strg.fishy[event.userID] = {} };
   
    try {
        switch (data.type) {
            case "upgradeSlotConfirm": {
                let money = strg.xu[event.userID],
                    fishy = strg.fishy[event.userID];

                for (let i = 0; i < data.choose-1; i++) {
                    fishy.critters.push({
                        name: "Empty",
                        size: 0.0,
                        price: 0,
                    })
                }

                money = money - (data.choose * 2000);
                strg.xu[event.userID] = money;
                strg.fishy[event.userID] = fishy;
                return fca.sendMessage(`[Fishing Shop] Bạn đã mua thành công ${handleReaction.choose} vị trí!`, event.threadID, event.messageID);
            }
            default:
                break;
        }
    }
    catch (e) {
        console.log(e);
        return fca.sendMessage(citnut.loihethong, event.threadID, event.messageID);
    }
};

async function makeEmptyCritterList () {
    let fishList = [];
    for (i = 0; i < 9; i++) {
        fishList.push({
            name: "Empty",
            size: 0.0,
            price: 0,
        });
    }
    return fishList;
};

async function getRarityRecursion (chance, index, number) {
    const catchChance = {
        'Very Common': 40,
        'Common': 30,
        'Uncommon': 20,
        'Rare': 9,
        'Very Rare': 2
    };
    const rarityList = [
        'Very Common',
        'Common',
        'Uncommon',
        'Rare',
        'Very Rare'
    ];

    if (index === 0 && chance <= catchChance[rarityList[0]]) return rarityList[0]
    else if (index >= rarityList.length - 1 && chance >= catchChance[rarityList[rarityList.length - 1]]) return rarityList[rarityList.length - 1]
    else if (chance > number && chance <= (number + catchChance[rarityList[index + 1]])) return rarityList[index + 1];
    else return getRarityRecursion(chance, index + 1, (number + catchChance[rarityList[index + 1]]));
};

async function getRarity () { return getRarityRecursion(Math.floor(Math.random() * 100), -1, 0) };

/*async function getFish (fishRarity, currentHour, currentMonth) {
    let newFishData = [];
    for (let i = 0; i < dataFish.length; i++) {
        if (dataFish[i].rarity.includes(fishRarity) && dataFish[i].time.includes(currentHour) && dataFish[i].months.includes(currentMonth)) {
            newFishData.push(dataFish[i])
        }
    };
    //let newFishData = dataFish.fish.filter(fish => fish.time.includes(currentHour) && fish.months.includes(currentMonth) && fish.rarity.includes(fishRarity));
    console.log(newFishData);
    return newFishData;
};*/

async function addCritter (user, critter, fca, event) {
    if (user.critters[user.critters.length - 1].price != 0 || typeof user.critters[user.critters.length - 1].price == "undefined") {
        fca.sendMessage("[Fishing] Túi của bạn không còn đủ không gian lưu trữ!", event.threadID, event.messageID)
    }else {
        for (let i = 0; i < user.critters.length; i++) {
            if (user.critters[i].price === 0) {
                user.critters[i] = critter;
                i = user.critters.length;
            }
        }
    }
    return user.critters;
};

module.exports = {
    keywords: ['fishing'],
    name: 'Câu cá ngay trên chính boxchat của bạn?',
    description: 'plugin này của Mirai nhưng Citnut đã làm nó hoạt động trên kb2abot',
    guide: '[sell/shop/upgrade/info/inventory/status/register]',
    childs: [],

    permission: {
        '*': '*'
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
    async onLoad() {
    },

    hookType: 'non-command',

    async onMessage(message, reply) {
        let event = await handleMessage(message),
            strg = this.storage.account.global;
            //prefix = this.storage.thread.global.prefix;
        if (!strg.fishy) { strg.fishy = {} };
        if (!strg.fishy[event.senderID]) { strg.fishy[event.senderID] = {} };

        if (message.type == "message_reply" && !Object.values(citnut).includes(event.body)) {
            let replyData = await handleReply.data(event, strg),
                userData = {
                    money: strg.xu[message.senderID],
                    fishy: strg.fishy[message.senderID]
                };
            if (isNaN(event.body)) return;
            if (replyData == null) return;
            if (replyData.author != event.senderID) return;
            const emptyItem = {
                name: "Empty",
                size: 0.0,
                price: 0,
            };
            switch (replyData.type) {
                case "shop": {
                    switch (event.body) {
                        case "1": {
                            let entryList = []
                                i = 1;
                            for (const item of dataItems.items) {
                                entryList.push(`${i}. ${item.name}: ${item.price} xu - Độ bền: ${item.durability}, thời gian chờ: ${item.time} giây`);
                                i++;
                            };
                    
                            return fca.sendMessage(
                                "=== Fishing Shop buy ===" +
                                "\n» Mời bạn nhập lựa chọn «\n\n" +
                                entryList.join("\n") +
                                "\n\n» Hãy reply tin nhắn và chọn theo số «"
                            , event.threadID, (error, info) => {
                                handleReply.pus({
                                    author: event.senderID,
                                    type: "buyShop"
                                }, event, strg);
                            });
                        }
                        case "2": {
                            let moneyAll = 0,
                                index = 0,
                                fishy = userData.fishy;

                            for (item of fishy.critters) {
                                moneyAll += item.price;
                                fishy.critters[index] = emptyItem;
                                index++;
                            };
                            const money = userData.money += moneyAll;
                            strg.xu[event.senderID] = money;
                            strg.fishy[event.senderID] = fishy;
                            return fca.sendMessage(`[ Fishing Sell ] Tổng số tiền bạn bán được là: ${moneyAll} xu`, event.threadID, event.messageID);
                        }
                        case "3":{
                            return fca.sendMessage(`=== Fishing Shop (Upgrade) ===\n\n[!] Hiện tại bạn đang có ${userData.fishy.critters.length += 1} vị trí có thể chứa đồ trong kho đồ của bạn\n» Để nâng cấp túi, bạn cần nhập số chỗ cần mở rộng «`, event.threadID, (error, info) => {
                                handleReply.pus({
                                    author: event.senderID,
                                    type: "upgradeSlot"
                                }, event, strg)
                            })
                        }
                        default:
                            break;
                    }
                    return;
                }
                //Shop
                case "buyShop": {
                    try {
                        const choose = parseInt(event.body);
                        //if (isNaN(event.body)) return fca.sendMessage(citnut.isNa, event.threadID, event.messageID);
                        if (choose > dataItems.length || choose < dataItems.length) return fca.sendMessage(citnut.listkoco, event.threadID, event.messageID);
                        const itemUserChoose = dataItems.items[choose - 1];
                        if (userData.money < itemUserChoose.price) return fca.sendMessage(citnut.kodutien, event.threadID, event.messageID);
                        userData["fishy"].fishingrod = itemUserChoose;
                        userData.money = userData.money - itemUserChoose.price;
                        return fca.sendMessage(`[Fishing Shop] Bạn đã mua thành công: ${itemUserChoose.name} với giá ${itemUserChoose.price} xu!`, event.threadID, event.messageID);
                    }
                    catch (e) {
                        console.log(e);
                        return fca.sendMessage("[Fishing] Hiện tại không thể mở shop vì đã xảy ra lỗi hệ thống, vui lòng thử lại sau hoặc đợi thông báo!", event.threadID, event.messageID); 
                    }
                }
                //upgrade
                case "upgradeSlot": {
                    try {
                        const choose = parseInt(event.body);
                        //if (isNaN(event.body)) return fca.sendMessage(citnut.isNa, event.threadID, event.messageID);
                        if (choose <= 0) return fca.sendMessage(citnut.koam, event.threadID, event.messageID);
                        const moneyOfUpgrade = choose * 2000;
                        if (userData.money < moneyOfUpgrade) return fca.sendMessage(`[Fishing Shop] Bạn không đủ tiền để có thể mua thêm chỗ cho túi đồ, bạn còn thiếu khoảng ${moneyOfUpgrade - userData.money}`, event.threadID, event.messageID);
                        return fca.sendMessage(`[Fishing Shop] Bạn đang cần mua ${choose} vị trí với giá ${moneyOfUpgrade} xu, nếu bạn đồng ý có thể reaction tin nhắn này!`, event.threadID, (error, info) => {
                            handleReaction({
                                author: event.senderID,
                                choose,
                                type: "upgradeSlotConfirm"
                            }, fca, event, strg)
                        })
                    }
                    catch (e) {
                        console.log(e);
                        return fca.sendMessage(citnut.loihethong, event.threadID, event.messageID);
                    }
                }
                default:
                break;
            }
        }
    },

    async onCall(message, reply) {
        let event = await handleMessage(message),
            strg = this.storage.account.global,    
            setting = this.storage.account.global.citSetting;

        if (!strg.fishy) { strg.fishy = {} };
        if (!strg.fishy[event.senderID]) { strg.fishy[event.senderID] = {} };
        if (setting.run.fishing != true) return reply(`plugin này đã bị tắt`);

        let userData = strg.fishy[event.senderID];

        const emptyItem = {
            name: "None",
            price: 0,
            time: 120
        };

        switch (getParam(message.body)) {
            case "register": {
                try {
                    console.log(typeof userData);
                    if (Object.entries(userData).length != 0) return fca.sendMessage("[Fishing Register] Bạn đã từng đăng ký vào hội!", event.threadID, event.messageID);
                    let fishy = {};
                    fishy.fishingrod = emptyItem;
                    fishy.critters = await makeEmptyCritterList();
                    //await setData(event.senderID, {fishy, strg});
                    strg.fishy[event.senderID] = fishy;
                    return fca.sendMessage("[Fishing Register] Bạn đã đăng ký vào hội thành công", event.threadID, event.messageID);
                }catch (e) {
                    console.log(e);
                    return fca.sendMessage(citnut.loidk, event.threadID, event.messageID);
                }
            }
            case "shop": {
                if (Object.entries(userData).length == 0)return fca.sendMessage("[Fishing] Bạn cần đăng ký vào hội câu cá, hãy sử dụng 'fishing register'", event.threadID, event.messageID);
                return fca.sendMessage(
                    "=== Fishing Shop ===" +
                    "\n» Mời bạn nhập lựa chọn «" +
                    "\n\n1. Buy." +
                    "\n2. Sell." +
                    "\n3. upgrade." +
                    "\n\n» Hãy reply tin nhắn và chọn theo số «"
                , event.threadID, (error, info) => {
                    handleReply.pus({
                        author: event.senderID,
                        type: "shop"
                    }, event, strg);
                }, event.messageID);
            }
            case "inventory": {
                if (Object.entries(userData).length == 0)return fca.sendMessage("[Fishing] Bạn cần đăng ký vào hội câu cá, hãy sử dụng 'fishing register'", event.threadID, event.messageID);
                let listCritters = [],
                    msg = "",
                    index = 1;
                for (const items of userData.critters) {
                    listCritters.push({
                        name: items.name,
                        rarity: items.rarity,
                        price: items.price,
                        size: items.size
                    })
                }

                listCritters.sort((a, b) => {
                    if (a.size > b.size) return -1;
                    if (a.size < b.size) return 1;

                    if (a.price > b.price) return -1;
                    if (a.price < b.price) return 1;
                })

                for (const sorted of listCritters) {
                    if (index == 6 || sorted.name == "Empty") ""
                    else {
                        msg += `\n${index}/ ${sorted.name}: ${sorted.size}cm - ${sorted.price} xu`;
                        index += 1;
                    }
                }
                if (msg.length == 0) msg = "[!] Hiện tại inventory của bạn chưa có gì [!]";
                const filter = listCritters.filter(items => items.name !== "Empty");

                return fca.sendMessage(`=== Fishing Inventory ===\n${msg}\n\n=== FishingRod Info ===\n\n» Fishing Rod Name: ${userData.fishingrod.name || 'Chưa có'}\n» durability left: ${userData.fishingrod.durability} lần câu\n» Tình trạng: ${(userData.fishingrod.durability == 0) ? "Đã bị gãy" : "Hoạt động tốt!"}\n\n=== Inventory Info ===\n\n» Slots: ${userData.critters.length += 1}\n» Tình trạng: ${((userData.critters.length - filter.length) == 0) ? "Túi đã đầy" : "Túi vẫn còn chỗ trống"}`, event.threadID, event.messageID);
            }
            default: {
                try {
                    const format = new Intl.NumberFormat();
                    if (Object.entries(userData).length == 0)return fca.sendMessage("[Fishing] Bạn cần đăng ký vào hội câu cá, hãy sử dụng 'fishing register'", event.threadID, event.messageID);
                    let dates = Math.floor((Math.abs(userData.time - new Date()) / 1000) / 60);
                    if (userData.fishingrod.price === 0) return fca.sendMessage("[Fishing] Bạn cần mua cần câu, hãy sử dụng 'fishing shop' để mua mới!", event.threadID, event.messageID);
                    else if (dates < userData.fishingrod.time) return fca.sendMessage("[Fishing] Bạn đang trong thời gian cooldown, hãy thử lại sau!", event.threadID, event.messageID);
                    else if (userData.fishingrod.durability < 1) {
                        userData.fishingrod = emptyItem;
                        return fca.sendMessage("[Fishing] Cần câu của bạn đã bị gãy, sử dụng 'fishing shop' để mua cần câu mới!", event.threadID, event.messageID);
                    };

                    let fishRarity = await getRarity();
                    let currentHour = new Date().getHours();
                    let currentMonth = new Date().getMonth();
                    //const fishData = await getFish(fishRarity, currentHour, currentMonth);
                    let fishData = [];
                    for (let i = 0; i < dataFish.length; i++) {
                        if (dataFish[i].rarity.includes(fishRarity) && dataFish[i].time.includes(currentHour) && dataFish[i].months.includes(currentMonth)) {
                            fishData.push(dataFish[i])
                        }
                    };
                    console.log(fishData);
                    if (!fishData[0]) return fca.sendMessage("[Fishing] Hiện tại trong hồ không có cá để câu", event.threadID, event.messageID);

                    let caught = fishData[Math.floor(Math.random() * parseInt(fishData.length))];
                    caught.size = round(random(caught.size[0], caught.size[1]), 1); //((Math.random() * (fishData.size[0] - fishData.size[1]) + fishData.size[1]).toFixed(1));
                    userData.critters = await addCritter(userData, caught, fca, event);
                    userData.fishingrod.durability--;
                    userData.time = new Date();

                    return fca.sendMessage(
                        "=== Bạn đã bắt được một con: " + caught.name + " ===" +
                        "\n\n» Kích cỡ: " + caught.size + "cm" +
                        "\n» Độ hiếm: " + caught.rarity +
                        "\n» Tổng số tiền có thể kiếm được: " + format.format(caught.price) + " xu" +
                        "\n» " + userData.time + " «"
                    , event.threadID, event.messageID);
                    
                }catch (e) {
                    console.log(e);
                    return fca.sendMessage(citnut.loihethong, event.threadID, event.messageID);
                }
            }
        }
    }
}