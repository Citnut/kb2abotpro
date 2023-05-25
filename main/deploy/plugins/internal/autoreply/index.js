const botengines = loader(`${__dirname}/botengines`).then(e=>e)
const { getParam } = kb2abot.helpers
export const keywords = ['autoreply', 'auto']
export const name = 'Tự động trả lời tin nhắn'
export const description = 'Dùng để bật chức năng tự động trả lời tin nhắn cho bot'
export const guide = '<engine>\nHiện tại gồm các engine: Simsimi*, Simsumi.\nĐể tắt bot thì dùng engine: off (/auto off)'
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
        local: {
            engine: 'off',
        },
    },
}
export async function onLoad() { }
export const hookType = 'non-command'
export async function onMessage(message, reply) {
    const { local } = this.storage.thread
    if (local.engine !== 'off')
        botengines[this.storage.thread.local.engine](message, reply)
}
export async function onCall(message, reply) {
    const { local } = this.storage.thread
    const name = getParam(message.body) || 'Simsimi'
    if (name !== 'off') {
        for (const botEngine in botengines) {
            if (name.toLowerCase() === botEngine.toLowerCase()) {
                local.engine = botEngine
                reply(`${local.engine} xin chào bạn!`)
                return
            }
        }
        reply(`Không tìm thấy engine nào có tên: ${name}`)
    } else {
        if (local.engine !== 'off') {
            reply(`${local.engine} chào tạm biệt ~~`)
            local.engine = 'off'
        }
    }
}
