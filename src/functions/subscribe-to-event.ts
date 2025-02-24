import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface ParamsProps {
  name: string
  email: string
  referrerId?: string | null
}

export async function subscribeToEvent({
  name,
  email,
  referrerId,
}: ParamsProps) {
  // cehck if user exists
  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))
  // lets user subscribe with previous subscription
  if (subscribers.length > 0) {
    return {
      subscriberId: subscribers[0].id,
    }
  }

  const res = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()
  const subscriber = res[0]

  // if user comes from invite (order set)
  if (referrerId) {
    await redis.zincrby('referral:ranking', 1, referrerId)
  }

  return {
    subscriberId: subscriber.id,
  }
}
