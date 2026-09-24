import type { Access } from 'payload'

/** Authenticated admin only */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

/** Anyone can read */
export const anyone: Access = () => true
