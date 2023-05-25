import decache from 'decache'
const { getParam } = kb2abot.helpers
export const keywords = ['reload']
export const name = 'Reload command'
export const description = 'Reload command(lệnh)'
export const guide = '<keyword>'
export const childs = []
export const permission = {
    '*': 'superAdmin',
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
    const keyword = getParam(message.body)
    if (!keyword)
        return reply('Vui lòng nhập keyword!')
    const found = kb2abot.pluginManager.findCommandsByKeyword(keyword)
    if (!found.length)
        reply(
            `Không tìm thấy lệnh nào có từ khóa: "${keyword}"\n Vui lòng xem danh sách lệnh ở ${kb2abot.config.DEFAULT_THREAD_PREFIX}help!`
        )
    if (found.length === 1) {
        const command = found[0].command
        try {
            decache(command._.path)
            const newCommand = await kb2abot.pluginManager.loadCommand(
                command._.path,
                false
            )
            Object.assign(command, newCommand)
            for (const prop in command) {
                if (newCommand[prop] === undefined)
                    delete command[prop]
            }
            reply(`Đã reload lệnh "${command.keywords[0]}"`)
        } catch (e) {
            console.newLogger.error(e.message)
        }
    }
    if (found.length > 1) {
        let replyMsg = `Có ${found.length} lệnh: \n`
        for (const f of found)
            replyMsg +=
                kb2abot.plugins.help.genHelp(
                    kb2abot.config.DEFAULT_THREAD_PREFIX,
                    f
                ) + '\n\n'
        reply(replyMsg)
    }
}
