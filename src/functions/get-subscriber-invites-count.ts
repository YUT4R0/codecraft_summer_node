import { redis } from '../redis/client'

interface ParamsProps {
  subscriberId: string
}

export async function getSubscriberInvitesCount({ subscriberId }: ParamsProps) {
  // score sorted set
  const count = await redis.zscore('referral:ranking', subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
