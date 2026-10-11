import { apiRequest } from './api'

export function getOwnGigs(token, signal) {
  return apiRequest('/gigs/mine', { token, signal })
}
