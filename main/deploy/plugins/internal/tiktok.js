import { getVideoMeta } from 'tiktok-scraper'
export const keywords = ['tiktok']
export const name = 'Lấy link video Tiktok'
export const description = 'Lấy link của bất kì video Tiktok nào (có watermark)'
export const guide = '<url>'
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
    const url = kb2abot.helpers.getParam(message.body)
    if (!url)
        reply('Chưa nhập URL.')
    try {
        const videoMeta = await getVideoMeta(url.toString(), {})
        reply(
            `Link của video này là: ${videoMeta.collector[0].videoUrlNoWaterMark.length
                ? videoMeta.collector[0].videoUrlNoWaterMark
                : videoMeta.collector[0].videoUrl}`
        )
    } catch {
        reply('Lỗi phát sinh trong quá trình lấy link.')
    }
}
