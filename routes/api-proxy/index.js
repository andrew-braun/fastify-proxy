const routePrefix = "/api-proxy"

export default async function apiProxyRoutes(server, options) {
	server.get(`${routePrefix}/words-api`, async (request, reply) => {
		// reply.header("Access-Control-Allow-Origin", "*")
		// reply.header("Access-Control-Allow-Methods", "GET")
		// reply.header("Access-Control-Allow-Headers", "*")

		const queryString = request.url.split("?")[1]

		const response = await fetch(
			`https://${process.env.WORDS_API_HOST}/words?${queryString}`,
			{
				method: "GET",
				headers: {
					"X-RapidAPI-Key": process.env.WORDS_API_KEY,
					"X-RapidAPI-Host": process.env.WORDS_API_HOST,
				},
			}
		)

		const data = await response.json()

		return {
			...data,
		}
	})
}
