import { parse } from 'semver';

export const des = 'Kiem tra phien ban nodejs';
export default async function fn() {
	const nodeVersion = parse(process.version);
	if (nodeVersion.major < 12 ||
		(nodeVersion.major == 12 && nodeVersion.minor < 9))
		throw `ERROR: Node.js 12+ (>=12.9) is required to run this! (current: "${process.version}")`;
}
