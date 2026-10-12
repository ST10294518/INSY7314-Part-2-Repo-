import { apiRequest } from './api'

export function getOwnGigs(token, signal) {
  return apiRequest('/gigs/mine', { token, signal })
}

export function createGig(gig, token) {
  return apiRequest('/gigs', {
    method: 'POST',
    token,
    body: JSON.stringify({
      title: gig.title,
      description: gig.description,
      price: gig.price,
      category: gig.category,
    }),
  })
}

export function updateGig(gigId, gig, token) {
  return apiRequest(`/gigs/${encodeURIComponent(gigId)}`, {
    method: 'PUT',
    token,
    body: JSON.stringify({
      title: gig.title,
      description: gig.description,
      price: gig.price,
      category: gig.category,
    }),
  })
}
