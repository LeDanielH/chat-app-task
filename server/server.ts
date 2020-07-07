import { acceptable, serve, acceptWebSocket } from './deps.ts'
import { handleWebSocket } from './handleWebSocket.ts'
import { TConnection } from "./types.ts";

const connections = new Array<TConnection>()
async function main() {
	const port = Deno.args[0] || '1234'
	console.log(`websocket server is running on http://localhost:${port}`)
	for await (const req of serve(`:${port}`)) {
		const isRequestAcceptable = acceptable(req)

		if (isRequestAcceptable) {
			const { conn, r: bufReader, w: bufWriter, headers } = req
			acceptWebSocket({
				conn,
				bufReader,
				bufWriter,
				headers
			})
				.then(handleWebSocket(connections))
				.catch(async (err) => {
					console.error(`failed to accept websocket: ${err}`)
					await req.respond({ status: 400 })
				})
		} else {
			console.log(req.method, req.url)

			const isGet = req.method === 'GET'
			const isRootUrl = req.url === '/'

			const isPage = isGet && isRootUrl

			if (isPage) {
				req.respond({
					headers: new Headers({
						'content-type': 'text/html'
					}),
					body: await Deno.open('./index.html')
				})
			} else {
				req.respond({
					body: 'Page not found',
					status: 404,
				})
			}
		}
	}
}

main()
