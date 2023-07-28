import Fastify from "fastify"
import fastifyPlugin from "fastify-plugin"
import "dotenv/config"
import indexRoutes from "./routes/index.js"
import apiProxyRoutes from "./routes/api-proxy/index.js"
import envPlugin from "./plugins/env.js"

const fastify = Fastify({
	logger: true,
})
fastify.register(fastifyPlugin(envPlugin))
fastify.register(fastifyPlugin(indexRoutes))
fastify.register(fastifyPlugin(apiProxyRoutes))

fastify.get("/test", async (request, reply) => {
	reply.send({ test: "success" })
})

async function initServer() {
	await fastify.ready()

	try {
		await fastify.listen({ port: fastify.config.HTTP_PORT || 4242 })

		console.log(`Server listening at port ${process.env.HTTP_PORT}`)
	} catch (error) {
		fastify.log.error(error)
		process.exit(1)
	}
}

initServer()
