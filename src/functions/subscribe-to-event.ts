import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'

interface ParamsProps {
  name: string
  email: string
}

export async function subscribeToEvent({ name, email }: ParamsProps) {
  const res = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()
  const subscriber = res[0]

  return {
    subscriberId: subscriber.id,
  }
}
