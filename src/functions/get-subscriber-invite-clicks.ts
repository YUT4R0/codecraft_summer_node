import { redis } from '../redis/client'

interface ParamsProps {
  subscriberId: string
}

export async function getSubscriberInviteClicks({ subscriberId }: ParamsProps) {
  const count = await redis.hget('referral:access-count', subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
