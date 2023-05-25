import { createServer } from 'http';

export const des = 'Tao server http gia cho heroku';
export default async function fn() {
	const server = createServer((req, res) => {
		res.writeHead(200, 'OK', {
			'Content-Type': 'text/plain'
		});
		res.write('This is just a dummy HTTP server to fool Heroku.');
		res.end();
	});
	server.listen(process.env.PORT || 0, '0.0.0.0');
}
