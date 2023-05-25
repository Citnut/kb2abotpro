import decache from 'decache'
import { join } from 'path'
const { getParam } = kb2abot.helpers
export const keywords = ['reloadgame', 'rlgame']
export const name = 'Reload game'
export const description = 'Reload game'
export const guide = '<game name>'
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
    const gameName = getParam(message.body)
    if (!gameName)
        return reply('Vui lòng nhập tên game!')
    const game = kb2abot.gameManager.findGameByName(gameName)
    if (!game) {
        reply(
            `Không tìm thấy game nào có tên: "${gameName}"\n Vui lòng xem lại danh sách game ở ${kb2abot.config.DEFAULT_THREAD_PREFIX}game!`
        )
    } else {
        try {
            const gamePath = join(kb2abot.config.DIR.GAME, gameName)
            decache(gamePath)
            kb2abot.gameManager.games[gameName] = require(gamePath)
            reply(`Đã reload game "${gameName}"`)
        } catch (e) {
            console.newLogger.error(e.message)
        }
    }
}
