import { redis } from '../redis/client'

interface ParamsProps {
  subscriberId: string
}

export async function getSubscriberRankingPosition({
  subscriberId,
}: ParamsProps) {
  // score sorted set
  const rank = await redis.zrevrank('referral:ranking', subscriberId)

  if (rank === null) {
    return { position: null }
  }

  return { position: rank + 1 }
}
