import checkInternetConnected from 'check-internet-connected';

export const des = 'Kiem tra ket noi internet';
export default async function fn() {
	const config = {
		timeout: 5000,
		retries: 5,
		domain: 'https://google.com' //the domain to check DNS record of
	};
	try {
		await checkInternetConnected(config);
	} catch (e) {
		throw `Vui long kiem tra lai ket noi internet! (${e.message})`;
	}
}
