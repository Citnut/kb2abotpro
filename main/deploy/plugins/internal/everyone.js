const { getParam } = kb2abot.helpers
const { getThreadInfo } = kb2abot.helpers.fca
export const keywords = ['everyone', 'all']
export const name = 'Tag mọi người'
export const description = 'Dùng để gọi hồn tất cả mọi người trong group'
export const guide = '<text>'
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
        local: {},
    },
}
export async function onLoad() { }
export const hookType = 'none'
export async function onMessage(message, reply) { }
export async function onCall(message, reply) {
    const text = getParam(message.body)
    const { participantIDs } = await getThreadInfo(message.threadID)
    let replyMsg
    const mentions = []
    participantIDs.splice(participantIDs.indexOf(fca.getCurrentUserID()), 1)
    for (const id of participantIDs) {
        let tag = '@'
        replyMsg += tag
        mentions.push({
            tag,
            id: id,
            fromIndex: replyMsg.length - tag.length,
        })
    }
    reply({
        body: replyMsg + (text || ''),
        mentions,
    })
}
