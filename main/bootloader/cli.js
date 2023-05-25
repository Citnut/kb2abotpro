import { createInterface } from 'readline';
import isRunning from 'is-running';
export const showStatus =  () => {
	const lives = [],
		dies = [];
	for (const bot of kb2abot.workers) {
		if (isRunning(bot.pid)) {
			lives.push(bot);
		} else {
			dies.push(bot);
		}
	}
	let logMessage = '';
	for (const live of lives) {
		logMessage += `${live.pid} ${live.name} >> live\n`;
	}
	for (const die of dies) {
		logMessage += `| ${die.pid} ${die.name} >> die\n`;
	}
	console.log(logMessage);
};


export const des = 'Cai dat cli';
export async function fn() {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout
	});

	const readInput = () => {
		rl.question('', function (data) {
			switch (data) {
				case 'status':
					showStatus();
					break;
				case 'cls':
					console.clear();
					break;
			}
			readInput();
		});
	};
	readInput();
}
