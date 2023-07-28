export default async function indexRoutes(server, options) {
	server.get("/hello-world", async (request, reply) => {
		return {
			hello: "hello world",
		}
	})
}
