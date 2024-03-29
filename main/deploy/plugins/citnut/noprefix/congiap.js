const { getFile, asyncWait } = kb2abot.helpers;
const citnut = "==== 12 con giáp trong dân gian ====\n 1. Tý 🐁\n 2. Sửu 🐃\n 3. Dần 🐅\n 4. Mão 🐈\n 5. Thìn 🐉\n 6. Tỵ 🐍\n 7. Ngọ 🦓\n 8. Mùi 🐐\n 9. Thân 🐒\n10. Dậu 🐓\n11. Tuất 🐕\n12. Hợi 🐖\n\nReply tin nhắn theo số để xem thêm về từng con giáp <3";

module.exports = {
	keywords: ["congiap"],
	name: '12 con giáp ( no prefix )',
	description: 'plugin của Hoàng Hải Long, dịch sang kb2abot plugin bởi Citnut',
	guide: '',
	childs: [],
	permission: {'*': '*'},
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
		let setting = this.storage.account.global.citSetting;
		if (message.type != "message_reply") return;
		//let message = await handleReply(message);

		if (!setting.run.congiap) return reply("lệnh này đã bị tắt");
		if (message.messageReply.body == citnut && message.messageReply.senderID == this.storage.account.global.botId) {
			switch(message.body){
				case "1":
					fca.sendMessage({
						body: "1. Tý ( Chuột 🐁 )\n\n(23-1 giờ): Lúc chuột đang hoạt động mạnh.\n\nChuột là con giáp đại diện cho một sự khởi đầu suôn sẻ, tốt đẹp. Người tuổi Tý thường có đặc điểm rất thu hút người khác phái, là một người duyên dáng, lanh lợi trong công việc. Người tuổi luôn mang trong mình một năng lượng tích cực, sáng tạo. Khi gặp khó luôn điềm tĩnh giải quyết khó khăn.\n\nTheo phong thủy, Chuột được xem như mang đến sự sung túc cho gia chủ. Trong các mẫu tượng 12 con giáp thì khi bày tượng linh vật Chuột thì gia chủ có thể được giúp đỡ giải quyết các tình huống, mang lại sự sung túc cho gia đình.", 
						attachment: getFile(`./main/deploy/plugins/citnut/data/congiap/ti.gif`)
					}, message.threadID, message.messageID);
				break;
				case "2":
					fca.sendMessage({
						body: "\n2. Sửu ( Tru 🐃 )\n\n(1-3 giờ): Lúc trâu đang nhai lại, chuẩn bị đi cày.\n\nTrâu tượng trưng cho sự siêng năng và lòng kiên nhẫn. Năm này có tiến triển vững vàng nhưng chậm và một sức mạnh bền bỉ; Người mang tuổi Sửu thường có tính cách thích hợp để trở thành một nhà khoa học.\n\nTrâu biểu tượng cho mùa xuân và nông nghiệp vì gắn liền với cái cày và thích đầm mình trong bùn. Người mang tuổi này thường điềm tĩnh và rất kiên định nhưng rất bướng bỉnh.", 
						attachment: getFile(`./main/deploy/plugins/citnut/data/congiap/suu.gif`)
					}, message.threadID, message.messageID);
				break;
				case "3":
					fca.sendMessage({
						body: "3. Dần ( Hổ 🐅 )\n\n(3-5 giờ): Lúc hổ hung hãn nhất.\n\nNhững người mang tuổi hổ thường rất dễ nổi giận, thiếu lập trường nhưng họ có thể rất mềm mỏng và xoay chuyển cá tính cho thích nghi với hoàn cảnh. Hổ là chúa tể rừng xanh, thường sống về đêm và gợi lên những hình ảnh về bóng đen và giông tố. Giờ Dần bắt đầu từ 3 giờ đến 5 giờ sáng khi cọp trở về hang sau khi đi rình mò trong đêm.", 
						attachment: getFile(`./main/deploy/plugins/citnut/data/congiap/dan.gif`)
					}, message.threadID, message.messageID); 
				break;
				case "4":
					fca.sendMessage({
						body: "4. Mão ( Mèo 🐈 )\n\n(5-7 giờ): Việt Nam gọi mèo, nhưng Trung Quốc gọi là thỏ, lúc trăng (thỏ ngọc) vẫn còn chiếu sáng.\n\nMèo tượng trưng cho những người ăn nói nhẹ nhàng, nhiều tài năng, nhiều tham vọng và sẽ thành công trên con đường học vấn. Họ rất xung khắc với người tuổi Tí. Người tuổi Mão có tinh thần mềm dẻo, tính kiên nhẫn và biết chờ thời cơ trước khi hành động.", 
						attachment: getFile(`./main/deploy/plugins/citnut/data/congiap/mao.gif`)
					}, message.threadID, message.messageID); 
				break;
				case "5":
					fca.sendMessage({
						body: "5. Thìn ( Rồng 🐉 )\n\n(7-9 giờ): Lúc đàn rồng quây mưa (Quần Long hành vũ).\n\nCon rồng trong huyền thoại của người phương Đông là tính Dương của vũ trụ, biểu tượng uy quyền hoàng gia. Theo đó, rồng hiện diện ở khắp mọi nơi, dưới nước, trên mặt đất và không trung. Rồng là biểu tượng của nước và là dấu hiệu thuận lợi cho nông nghiệp. Người tuổi Rồng rất trung thực, năng nổ nhưng rất nóng tính và bướng bỉnh. Họ là biểu tượng của quyền lực, sự giàu có, thịnh vượng và của hoàng tộc.", 
						attachment: getFile(`./main/deploy/plugins/citnut/data/congiap/thin.gif`)
					}, message.threadID, message.messageID); 
				break;
				case "6":
					fca.sendMessage({
						body: "6. Tỵ ( Rắn 🐍 )\n\n(9-11 giờ): Lúc rắn không hại người.\n\nNgười tuổi rắn nói ít nhưng rất thông thái. Họ thích hợp với vùng đất ẩm ướt. Rắn tượng trưng cho sự tiến hóa vĩnh cửu của tuổi tác và sự kế vị, sự phân hủy và sự nối tiếp các thế hệ của nhân loại. Người tuổi rắn rất điềm tĩnh, hiền lành, sâu sắc và cảm thông nhưng thỉnh thoảng cũng hay nổi giận. Họ rất kiên quyết và cố chấp.", 
						attachment: getFile(`./main/deploy/plugins/citnut/data/congiap/tii.gif`)
					}, message.threadID, message.messageID); 
				break;
				case "7":
					fca.sendMessage({
						body: "7. Ngọ ( Ngựa 🦓 )\n\n(11-13 giờ): Ngựa có dương tính cao.\n\nNgười tuổi Ngọ thường ăn nói dịu dàng, thoải mái và rộng lượng. Do đó, họ dễ được nhiều người mến chuộng nhưng họ ít khi nghe lời khuyên can. Người tuổi này thường có tính khí rất nóng nảy. Tốc độ chạy của ngựa làm người ta liên tưởng đến mặt trời rọi đến trái đất hàng ngày. Trong thần thoại, mặt trời được cho là liên quan đến những con ngựa đang nổi cơn cuồng nộ. Tuổi này thường được cho là có tính thanh sạch, cao quý và thông thái. Người tuổi này thường được quý trọng do thông minh, mạnh mẽ và đầy thân ái tình người.", 
						attachment: getFile(`./main/deploy/plugins/citnut/data/congiap/ngo.gif`)
					}, message.threadID, message.messageID); 
				break;
				case "8":
					fca.sendMessage({
						body: "8. Mùi ( Dê 🐐 )\n\n(13-15 giờ): Lúc dê ăn cỏ không ảnh hưởng tới việc cây cỏ mọc lại.\n\nNgười mang tuổi Mùi thường rất điềm tĩnh nhưng nhút nhát, rất khiêm tốn nhưng không có lập trường. Họ ăn nói rất vụng về, vì thế họ không thể là người bán hàng giỏi nhưng họ rất cảm thương người hoạn nạn và thường hay giúp đỡ mọi người. Họ thường có lợi thế vì tính tốt bụng và nhút nhát tự nhiên của họ.", 
						attachment: getFile(`./main/deploy/plugins/citnut/data/congiap/mui.gif`)
					}, message.threadID, message.messageID); 
				break;
				case "9":
					fca.sendMessage({
						body: "9. Thân ( Khỉ 🐒 )\n\n(15-17 giờ): Lúc khỉ thích hú.Người tuổi Thân thường là một nhân tài có tính cách thất thường. Họ rất tài ba và khéo léo trong các vụ giao dịch tiền bạc. Người tuổi này thường rất vui vẻ, khéo tay, tò mò và nhiều sáng kiến, nhưng họ lại nói quá nhiều nên dễ bị người khác xem thường và khinh ghét. Khuyết điểm của họ nằm trong tính khí thất thường và không nhất quán.", 
						attachment: getFile(`./main/deploy/plugins/citnut/data/congiap/than.gif`)
					}, message.threadID, message.messageID); 
				break;
				case "10":
					fca.sendMessage({
						body: "10. Dậu ( Gà 🐓)\n\n(17-19 giờ): Lúc gà bắt đầu lên chuồng.\n\nNgười sinh năm Dậu có nhiều đặc điểm xuất sắc, chẳng hạn như trung thực, sáng sủa, thích giao tiếp và tham vọng. Hầu hết họ sinh ra đều khá hoặc đẹp trai và thích ăn diện. Trong cuộc sống hàng ngày, họ ít khi dựa dẫm vào người khác. Tuy nhiên, họ có thể nhiệt tình với một việc gì đó một cách nhanh chóng, nhưng lại nhanh chóng trở nên thiếu kiên nhẫn. Vì vậy, họ cần có đủ niềm tin và sự kiên nhẫn để kiên định một điều.\n\nNăm Dậu tượng trưng cho một giai đoạn hoạt động lao động cần cù siêng năng vì gà phải bận rộn từ sáng đến tối. Cái mào của nó là một dấu hiệu của sự cực kỳ thông minh và một trí tuệ bác học. Người sinh vào năm Dậu được xem là người có tư duy sâu sắc. Đồng thời, Gà được coi là sự bảo vệ chống lại lửa. Người sinh vào năm Dậu thường kiếm sống nhờ kinh doanh nhỏ, làm ăn cần cù như một chú gà bới đất tìm sâu.", 
						attachment: getFile(`./main/deploy/plugins/citnut/data/congiap/dau.gif`)
					}, message.threadID, message.messageID); 
				break;
				case "11":
					fca.sendMessage({
						body: "11. Tuất ( Chó 🐕 )\n\n(19-21 giờ): Lúc chó phải tỉnh táo để trông nhà.\n\nNăm Tuất cho biết một tương lai thịnh vượng. Trên khắp thế giới, chó được dùng để giữ nhà chống lại những kẻ xâm nhập. Những cặp chó đá thường được đặt hai bên cổng làng để bảo vệ. Năm Tuất được tin là năm rất an toàn.", 
						attachment: getFile(`./main/deploy/plugins/citnut/data/congiap/tuat.gif`)
					}, message.threadID, message.messageID); 
				break;
				case "12":
					fca.sendMessage({
						body: "12. Hợi ( Lợn 🐖 )\n\n(21-23 giờ): Lúc lợn ngủ say nhất.\n\nLợn tượng trưng cho sự giàu có vì loài lợn rừng thường làm hang trong những khu rừng. Người tuổi Hợi rất hào hiệp, tốt bụng và dũng cảm nhưng thường rất bướng bỉnh, nóng tính nhưng siêng năng và chịu lắng nghe.", 
						attachment: getFile(`./main/deploy/plugins/citnut/data/congiap/hoi.gif`)
					}, message.threadID, message.messageID); 
				break;
				default:
					fca.sendMessage("Djtconmemaynguvailon nhap 1-12 thoi <3 iu", message.threadID, message.messageID); 
				break
			};
			asyncWait(10000).then(() => {fca.unsendMessage(message.messageReply.messageID)})
		};

		if (setting.autorun != true || message.senderID == this.storage.account.global.botId) {
		}else if (message.body.toLowerCase().indexOf("12 con giáp") == 0 || (message.body.toLowerCase().indexOf("12 con giap") == 0)) {
			fca.sendMessage({
				body: citnut,
				attachment: getFile("./main/deploy/plugins/citnut/data/congiap/12congiap.jpg")
			}, message.threadID, message.messageID);
		}
	},

	async onCall(message, reply) {
		let setting = this.storage.account.global.citSetting; 

		if (!setting.run.congiap) {
			reply(`plugin này đã bị tắt`)
		}else {
			fca.sendMessage({
				body: citnut,
				attachment: getFile("./main/deploy/plugins/citnut/data/congiap/12congiap.jpg")
			}, message.threadID, message.messageID);
		}
	}
}
