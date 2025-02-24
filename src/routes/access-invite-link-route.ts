import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../env'
import { acessInviteLink } from '../functions/acess-invite-link'
import { redis } from '../redis/client'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access invite link and redirects user',
        tags: ['referral'],
        params: z.object({
          subscriberId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string().uuid(),
          }),
        },
      },
    },
    async (req, res) => {
      const { subscriberId } = req.params

      await acessInviteLink({ subscriberId })

      const redirectUrl = new URL(env.WEB_URL)
      console.log(await redis.hgetall('referral:access-count'))
      redirectUrl.searchParams.set('referrer', subscriberId)

      return res.redirect(redirectUrl.toString(), 302)
    }
  )
}
