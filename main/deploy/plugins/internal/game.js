const {getParam} = kb2abot.helpers;
const gameManager = kb2abot.gameManager;

export const keywords = ['game'];
export const name = 'Chơi game';
export const description = 'Hiện tại gồm các game: ' + gameManager.getList().join(', ');
export const guide = '<tên game>';
export const childs = [];
export const permission = {
    '*': '*'
};
export const datastoreDesign = {
    account: {
        global: {},
        local: {}
    },
    thread: {
        global: {},
        local: {}
    }
};
export async function onLoad() { }
export const hookType = 'non-command';
export async function onMessage(message, reply) {
    for (const game of gameManager.items) {
        if ((game.participants.includes(message.senderID) && !message.isGroup) ||
            game.threadID == message.threadID) {
            game.onMessage(message, reply);
        }
    }
}
export async function onCall(message, reply) {
    const tmp = getParam(message.body).split(' ');
    const gameName = tmp[0];
    const gameParam = tmp.slice(1).join(' ');

    if (gameManager.isValid(gameName)) {
        try {
            gameManager.run(gameName, {
                masterID: message.senderID,
                threadID: message.threadID,
                param: gameParam,
                isGroup: message.isGroup
            });
        } catch (e) {
            reply(`Không thể tạo game ${gameName}\nGặp lỗi: ${e.message}`);
        }
    } else {
        reply(
            `Không tìm thấy game nào có tên ${gameName}!\n\nList các game:\n- ${gameManager
                .getList()
                .join('\n- ')}`
        );
    }
}