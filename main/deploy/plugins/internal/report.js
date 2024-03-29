export const keywords = ['report']
export const name = 'Báo lỗi'
export const description = 'Dùng gửi góp ý, báo lỗi tới nhà phát triển kb2abot'
export const guide = '<text>'
export const childs = []
export const permission = {
    '*': '*',
}
export const datastoreDesign = {
    account: {
        global: {},
        local: {},
    },
    thread: {
        global: {},
        local: {},
    },
}
export async function onLoad() { }
export const hookType = 'none'
export async function onMessage(message, reply) { }
export async function onCall(message, reply) {
    const text = kb2abot.helpers.getParam(message.body)
    if (text.length) {
        fca.sendMessage(
            `Tôi có góp ý: ${text}\nTin nhắn này được gửi bởi id: ${message.threadID}`,
            '100007723935647'
        )
        reply(
            `Đã gửi tin nhắn góp ý tới nhà phát triển với nội dung: ${text}`
        )
    } else
        reply('Bạn thiếu param <text> (vd: /kb2abot đã bị lỗi!)')
}
