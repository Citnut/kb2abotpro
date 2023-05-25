import { existsSync, readdirSync } from 'fs'
import recursive from 'recursive-readdir'
import { basename, join } from 'path'
import { get } from 'axios'
const { validURL, downloadFile } = kb2abot.helpers
export const keywords = ['checkupdate']
export const name = 'Cập nhật'
export const description = 'Kiểm tra cập nhật của các plugin'
export const guide = ''
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
export async function onLoad() {
    const checkupdate = async () => {
        console.newLogger.debug('PLUGINS - Dang kiem tra update . . .')
        const files = (await recursive(kb2abot.config.DIR.PLUGIN)).filter(
            (file) => basename(file) === 'manifest.json' &&
                validURL(require(file).update.manifest) &&
                validURL(require(file).update.plugin)
        )
        let newVer = false
        for (const file of files) {
            const manifest = require(file)
            const { data: tmp_manifest } = await get(
                manifest.update.manifest
            )
            const outputFileName = `${manifest.name} ${tmp_manifest.version}.zip`
            const output = join(
                kb2abot.config.DIR.UPDATE,
                outputFileName
            )
            if (!existsSync(output) &&
                manifest.version !== tmp_manifest.version) {
                newVer = true
                console.newLogger.warn(
                    `PLUGINS - Phat hien phien ban moi, dang tai ${manifest.name} [${tmp_manifest.version}]!`
                )
                await downloadFile(manifest.update.plugin, output)
                console.newLogger.debug(
                    `PLUGINS - Da tai ${manifest.name} [${tmp_manifest.version}] tai ${output}!`
                )
            }
        }
        if (!newVer) {
            console.newLogger.debug(
                'PLUGINS - khong tim thay phien ban moi!'
            )
        }
    }
    setInterval(() => checkupdate(), kb2abot.config.INTERVAL.CHECK_UPDATE)
    await checkupdate()
}
export const hookType = 'none'
export async function onMessage(message, reply) { }
export async function onCall(message, reply) {
    const files = readdirSync(kb2abot.config.DIR.UPDATE)
        .filter((filename) => filename.split('.').pop() === 'zip')
    if (files.length > 0)
        reply(
            'Đường dẫn file updates: /main/deploy/updates\nVui lòng tự update (có thể move, delete hoặc extract)\nDanh sách file updates:\n' +
            files.join(', ')
        )
    else
        reply('Không tìm thấy bản cập nhật nào!')
}
