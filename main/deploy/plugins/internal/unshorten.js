import axios from 'axios'
import { load } from 'cheerio'
export const keywords = ['unshorten']
export const name = 'Xem URL rút gọn'
export const description = 'Xem URL gốc trước khi bị rút gọn (bất kì dịch vụ nào: bitly, tinyurl,...)'
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
    const unshorten = async function (url) {
        const page = await axios({
            url: 'https://unshorten.it/',
            withCredentials: true,
        }), token = load(page.data)(
            "input[name='csrfmiddlewaretoken']"
        )[0].attribs.value, cookies = page.headers['set-cookie']
            .map((x) => x.split(';')[0])
            .join(';'), longUrl = await axios({
                url: 'https://unshorten.it/main/get_long_url',
                method: 'POST',
                headers: {
                    'accept-encoding': 'application/json',
                    cookie: cookies,
                    referer: 'https://unshorten.it/',
                },
                data: 'short-url=' +
                    encodeURIComponent(url) +
                    '&csrfmiddlewaretoken=' +
                    token,
            })
        return longUrl.data['long_url']
    }
    const url = kb2abot.helpers.getParam(message.body)
    if (!url)
        reply('Chưa nhập URL.')
    try {
        unshorten(url).then((data) => reply(`URL gốc là: ${data}`))
    } catch {
        reply(`Lỗi phát sinh trong quá trình khôi phục.`)
    }
}
