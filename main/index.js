import {existsSync, writeFileSync, readdirSync, appendFileSync} from "node:fs"
import path from "node:path"
import ora from "ora"
import Cluster from "node:cluster"
import emoji from "node-emoji"
import { subname } from "./deploy/helpers/common.js"
import { initLogger, setTerminalTitle } from "./deploy/helpers/console.js"
initLogger(emoji.emojify(':star: INTERNAL'))
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const memoryUsages = [0]
// CHECK CONFIG FILE
const defaultConfig = `
import path from "node:path"
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
export default {
	DEFAULT_THREAD_PREFIX: '/', // prefix mặc định cho mỗi box mới
	DIR: {
		GAME: path.join(__dirname, 'games'),
		PLUGIN: path.join(__dirname, 'plugins'),
		DATSTORE: path.join(__dirname, 'datastores'),
		SCHEMA: path.join(__dirname, 'schemas'),
		HELPER: path.join(__dirname, 'helpers'),
		UPDATE: path.join(__dirname, 'updates')
	},
	INTERVAL: {
		SAVE_DATASTORE: 5 * 1000,
		CHECK_UPDATE: 3 * 60 * 60 * 1000,
		AUTO_ACCEPT_REQUEST: 10 * 1000,
		QUEUE_MESSAGE: 1000
	},
	PRETTY_DATASTORE: true, // enable may cause to its performance (adding tab characters to datastore)
	SUPER_ADMINS: [
		// 'super admin' có permission hơn cả admin, thường là những người điều khiển bot
		// Những người này có quyền được sử dụng 1 số lệnh nguy hiểm (như reload, update, ...)
		// Bạn có thể lên trang: findidfb.com hoặc lookup-id.com để lấy ID Facebook
		'100048509610460'
	],
	REFRESH_ADMINIDS: false,
	// Bật cái này để làm mới lại list admin mỗi khi tin nhắn đến (còn không thì phải restart bot thì nó mới làm mới lại list)
	// Những bạn nào có acc khỏe hoặc số lượng box hoạt động nhỏ (<10) thì mới nên bật
	FCA_OPTIONS: {
		logLevel: 'silent', // logger đăng nhập fb ("silly", "verbose", "info", "http", "warn", "error", or "silent")
		selfListen: false, // KHÔNG NÊN BẬT KHI SỬ DỤNG PLUGIN CÓ HOOK NHƯ AUTOREPLY (VÒNG LẶP -> SPAM)
		forceLogin: true, // Tự động accept location lạ khi login
		userAgent:
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/600.3.18 (KHTML, like Gecko) Version/8.0.3 Safari/600.3.18',
		// Khi userAgent truyền vào không hợp lệ, bot sẽ không nhận được tin nhắn gì hết
		// Mặc định: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/600.3.18 (KHTML, like Gecko) Version/8.0.3 Safari/600.3.18
		// Cái userAgent này lạ lắm, mình test thử chrome & firefox thì thấy hoạt động trên mỗi chrome :/
		// Lưu ý khi bỏ userAgent vào thì nhớ tìm xóa "Chrome/xx.x.xxxx.xx" (kế cuối), mình ko hiểu tại sao nhưng làm vậy nó mới hoạt động :)
		autoMarkDelivery: false, // Đánh dấu là đã nhận
		autoMarkRead: false // Đánh dấu là đã đọc
	}
};
`
!existsSync("main/deploy/CONFIG.js") && writeFileSync("main/deploy/CONFIG.js", defaultConfig)
// GLOBAL VARIABLE
import Kb2abotGlobal from "./deploy/Kb2abotGlobal.js"
import loader from "./deploy/loader.js"
globalThis.loader = loader
// globalThis.kb2abot = new Kb2abotGlobal()
globalThis.kb2abot = Kb2abotGlobal()

// EXTRACT PLUGINS & GAMES
import AdmZip from "adm-zip"
const paths = {
    plugins: {
        e: path.join(kb2abot.config.DIR.PLUGIN, 'extracted_plugins'),
        dir: kb2abot.config.DIR.PLUGIN,
    },
    games: {
        e: path.join(kb2abot.config.DIR.GAME, 'extracted_games'),
        dir: kb2abot.config.DIR.GAME,
    },
}
for (const key in paths) {
    const { e, dir } = paths[key]
    let extracted
    try {
        extracted = readFileSync(e).toString()
    } catch {
        extracted = ''
    }
    const zipfiles = readdirSync(dir)
        .filter(
            (filename) =>
                filename.includes('.zip') && !extracted.includes(filename)
        )
    for (const file of zipfiles) {
        const zipPath = path.join(dir, file)
        const zip = new AdmZip(zipPath)
        zip.extractAllTo(dir, true)
        console.newLogger.success(`EXTRACTED ${key.toUpperCase()}: ${file}`)
        appendFileSync(e, file + '\n')
    }
}
//	EXTRACT PLUGINS & GAMES
const botsDir = path.join(__dirname, '../bots')
const deployPath = path.join(__dirname, './deploy/index.js')
Cluster.on('exit', (worker, code, signal) => {
    if (signal)
        console.newLogger.warn(
            `Bot PID: ${worker.process.pid} da dung, SIGNAL: ${signal}`
        )
    else {
        const funcKey = !code ? 'warn' : 'error'
        console.newLogger[funcKey](
            `Bot PID: ${worker.process.pid} da dung, ERROR_CODE: ${code}`
        )
    }
})
Cluster.on('online', (worker) => {
    worker.send('memoryUsage')
    worker.on('message', (dd) => {
        if (dd.event === 'memoryUsage') {
            memoryUsages[worker.id] = dd.data.heapTotal / 1024 / 1024
            setTimeout(() => {
                if (!worker.isDead()) worker.send('memoryUsage')
            }, 2000)
        }
    })
})
;(async function () {
    const timeStart = Date.now()
    console.log('Dang kiem tra cu phap code . . .\n')
    try {
        kb2abot.bootloader = await loader(path.join(__dirname, 'bootloader'))
        kb2abot.schemas = await loader(path.join(__dirname, 'deploy/schemas'))
        kb2abot.helpers = await loader(kb2abot.config.DIR.HELPER)
        kb2abot.gameManager = new kb2abot.helpers.GameManager(
            await loader(kb2abot.config.DIR.GAME)
        )
        kb2abot.pluginManager = new kb2abot.helpers.PluginManager()
        await kb2abot.pluginManager.loadAllPlugins(undefined, false)
    } catch (e) {
        console.log(e)
        console.newLogger.error(e.message)
        console.newLogger.error(
            'Vui long kiem tra lai file tren hoac lien he ho tro: fb.com/khoakomlem'
        )
        process.exit()
    }
    const latency = Date.now() - timeStart
    console.log(
        '\n' +
            '██  ███ █  █ ███\n' +
            '█ █ █ █ ██ █ █_\n' +
            '█ █ █ █ █ ██ █\n' +
            '██  ███ █  █ ███\n' +
            `Thoi gian setup: ${latency}ms!`
    )
    const { cli, checkInternet, update, updateCli, foolHeroku } =
        kb2abot.bootloader
    const tasks = []
    const isDev = process.argv.slice(2)[0] === 'dev'
    tasks.push(checkInternet)
    if (!isDev) tasks.push(...[update, updateCli])
    tasks.push(...[foolHeroku, cli])
    for (const task of tasks) {
        const spinner = ora(task.des).start()
        try {
            await task.fn()
        } catch (e) {
            console.newLogger.error(e)
            spinner.stop()
            process.exit()
        }
        spinner.succeed()
    }
    const botList = readdirSync(botsDir)
        .filter(
            (name) =>
                (name.includes('.txt') && name !== 'README.txt') ||
                name.includes('.json')
        ) // array include extension *.txt
    if (!botList.length)
        console.newLogger.error('Ban chua dat cookie vao folder /bots')
    setInterval(() => {
        const memoryUsage = memoryUsages.reduce((a, b) => a + b)
        setTerminalTitle(
            `KB2ABOT - ClusterS: ${
                botList.length
            } - MEMORY: ${memoryUsage.toFixed(2)}MB`
        )
    }, 3000)
    for (const bot of botList) {
        const cookiePath = path.join(botsDir, bot)
        Cluster.setupPrimary({
            exec: deployPath,
            args: [
                '--cookiePath',
                cookiePath,
                '--name',
                subname(path.basename(cookiePath)),
            ],
        })
        // console.log(["--cookiePath", cookiePath, "--name", subname(path.basename(cookiePath))]);
        const worker = Cluster.fork()
        console.log(`Dang tao Cluster "${bot}" PID: ${worker.process.pid}`)
    }
})()