import fastifyCors from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { subscribeToEventRoute } from './routes/subscribe-to-event'

// zod configurations
const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.register(fastifyCors)
// documentation
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Nlw Connect Node',
      version: '0.0.1',
      description: 'API for nlw codecraft summer app',
    },
  },
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})
// routes
app.register(subscribeToEventRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log(`
  [+] Server running on http://localhost:${env.PORT}
  [+] Api documentation running on http://localhost:${env.PORT}/docs
  `)
})
