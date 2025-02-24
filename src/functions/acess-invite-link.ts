import { redis } from '../redis/client'

interface ParamsProps {
  subscriberId: string
}

export async function acessInviteLink({ subscriberId }: ParamsProps) {
  await redis.hincrby('referral:access-count', subscriberId, 1)
}
