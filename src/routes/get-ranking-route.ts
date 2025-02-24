import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getRanking } from '../functions/get-ranking'

export const getRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get ranking (3 firsts users)',
        tags: ['referral'],
        response: {
          200: z.array(
            z.object({
              id: z.string().uuid(),
              name: z.string(),
              score: z.number().int(),
            })
          ),
        },
      },
    },
    async req => {
      const { rankingWithScore } = await getRanking()

      return rankingWithScore
    }
  )
}
