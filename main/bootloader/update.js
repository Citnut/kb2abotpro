import { get } from 'axios';
import { version } from '../../package.json';

export const des = 'Kiem tra va cap nhat kb2abot';
export default async function fn() {
	const { data } = await get(
		'https://raw.githubusercontent.com/Citnut/kb2abotpro/main/package.json'
	);
	if (data.version != version) {
		const { data: info } = await get(
			'https://api.github.com/repos/Citnut/kb2abotpro/git/refs/heads/main'
		);
		const { data: commit } = await get(info.object.url);
		console.log();
		console.newLogger.debug(
			`Da co phien ban moi: ${data.version}, phien ban hien tai: ${version}, go "npm run update" de cap nhat!`
		);
		console.newLogger.debug(`Noi dung update: ${commit.message}`);
	}
}
