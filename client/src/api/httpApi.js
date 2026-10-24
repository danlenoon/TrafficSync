// The real client. Every function here talks to YOUR Express API.
//
// This is the file that matters for your finals project. mockApi.js exists so
// you can build the interface before this has anywhere to point.

const BASE = import.meta.env.VITE_API_BASE_URL || ''

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  }

  // Provide Basic Authentication credentials if configured
  const username = import.meta.env.VITE_APP_USERNAME || 'admin'
  const password = import.meta.env.VITE_APP_PASSWORD || 'your_secure_password'
  if (username && password) {
    try {
      headers['Authorization'] = `Basic ${btoa(`${username}:${password}`)}`
    } catch {
      // Browser btoa fallback if needed
    }
  }

  const response = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    // Try to use the API's own message; fall back to the status line.
    let message = `${response.status} ${response.statusText}`
    try {
      const body = await response.json()
      if (body?.error) message = body.error
    } catch {
      // The body was not JSON. The status line is all we have.
    }
    throw new Error(message)
  }

  return response.status === 204 ? null : response.json()
}

export const listSimulations = () => request('/api/simulations')

export const getSimulation = (id) => request(`/api/simulations/${id}`)

export const createSimulation = (input) =>
  request('/api/simulations', { method: 'POST', body: JSON.stringify(input) })

export const updateSimulation = (id, input) =>
  request(`/api/simulations/${id}`, { method: 'PUT', body: JSON.stringify(input) })

export const deleteSimulation = (id) =>
  request(`/api/simulations/${id}`, { method: 'DELETE' })

// Backward compatibility aliases
export const listSightings = listSimulations
export const getSighting = getSimulation
export const createSighting = createSimulation
export const updateSighting = updateSimulation
export const deleteSighting = deleteSimulation
