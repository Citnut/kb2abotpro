export const keywords = ['backup']
export const name = 'Lưu trữ tin nhắn'
export const description = 'Xem tin nhắn đã gỡ hoặc sao lưu tin nhắn'
export const guide = ''
export const childs = []
export const permission = {
    '*': 'admin',
}
export const datastoreDesign = {
    account: {
        global: {},
        local: {},
    },
    thread: {
        global: {},
        local: {
            messages: [],
        },
    },
}
export async function onLoad() { }
export const hookType = '*'
export async function onMessage(message, reply) {
    this.storage.thread.local.messages.push(message)
}
export async function onCall(message, reply) {
    reply(
        `Tổng số tin nhắn đã lưu trữ: ${this.storage.thread.local.messages.length}`
    )
}
