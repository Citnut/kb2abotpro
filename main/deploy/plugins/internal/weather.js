import { get } from 'axios'
const WEATHER_KEY = '9e41bc31443314a1c5ad9695f2e9f9d1'
export const keywords = ['weather']
export const name = 'Thời tiết hiện tại'
export const description = 'Cho thông tin về thời tiết hiện tại 1 theo địa chỉ'
export const guide = '<location>'
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
    const location = kb2abot.helpers.getParam(message.body)
    if (!location)
        return reply('Vui lòng nhập địa chỉ!')
    try {
        const { weather, main, name } = (
            await get(
                `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
                    location
                )}&APPID=${WEATHER_KEY}`
            )
        ).data
        const replyMsg = `Name: ${name}\nWeather: ${weather[0].main} (${weather[0].description})\nTemperature: ${Math.round(
            main.temp_min - 273
        )}°C ~ ${Math.round(main.temp_max - 273)}°C`
        reply(replyMsg)
    } catch {
        reply(`Không tìm thấy địa điểm nào có tên: ${location}`)
    }
}
