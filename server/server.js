import express from 'express'
import cors from 'cors'
import { pool } from './db/pool.js'
import * as simulations from './simulationsRepo.js'

const app = express()

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '100kb' }))

// Is the process alive?
app.get('/healthz', (request, response) => {
  response.json({ ok: true })
})

// Is the database reachable?
app.get('/readyz', async (request, response) => {
  try {
    await pool.query('SELECT 1')
    response.json({ ok: true, db: 'up' })
  } catch (error) {
    console.error('readyz failed:', error.message)
    response.status(503).json({ ok: false, db: 'down' })
  }
})

// HTTP Basic Authentication Middleware
app.use((req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="TrafficSync"')
    return res.status(401).json({ error: 'Authentication required' })
  }
  const base64Str = authHeader.substring(6)
  const credentials = Buffer.from(base64Str, 'base64').toString('utf8')
  const [username, password] = credentials.split(':')
  
  const expectedUsername = process.env.APP_USERNAME
  const expectedPassword = process.env.APP_PASSWORD

  if (
    expectedUsername && expectedPassword &&
    username === expectedUsername &&
    password === expectedPassword
  ) {
    next()
  } else {
    res.set('WWW-Authenticate', 'Basic realm="TrafficSync"')
    return res.status(401).json({ error: 'Invalid credentials' })
  }
})

function validateSimulation(body) {
  const errors = []
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const road_name = typeof body.road_name === 'string' ? body.road_name.trim() : title

  if (!title) errors.push('title is required')

  return { errors, value: { title, road_name, data: body.data ?? {} } }
}

app.get('/api/simulations', async (request, response, next) => {
  try {
    response.json(await simulations.getAll(pool))
  } catch (error) {
    next(error)
  }
})

app.get('/api/simulations/:id', async (request, response, next) => {
  try {
    const row = await simulations.getById(pool, request.params.id)
    if (!row) return response.status(404).json({ error: 'Not found' })
    response.json(row)
  } catch (error) {
    next(error)
  }
})

app.post('/api/simulations', async (request, response, next) => {
  const { errors, value } = validateSimulation(request.body ?? {})
  if (errors.length > 0) return response.status(400).json({ error: errors.join('; ') })

  try {
    response.status(201).json(await simulations.create(pool, value))
  } catch (error) {
    next(error)
  }
})

app.put('/api/simulations/:id', async (request, response, next) => {
  const { errors, value } = validateSimulation(request.body ?? {})
  if (errors.length > 0) return response.status(400).json({ error: errors.join('; ') })

  try {
    const row = await simulations.update(pool, request.params.id, value)
    if (!row) return response.status(404).json({ error: 'Not found' })
    response.json(row)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/simulations/:id', async (request, response, next) => {
  try {
    const removed = await simulations.remove(pool, request.params.id)
    if (!removed) return response.status(404).json({ error: 'Not found' })
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.use((request, response) => {
  response.status(404).json({ error: 'No such route' })
})

app.use((error, request, response, next) => {
  console.error(error)
  response.status(500).json({ error: 'Something went wrong on the server' })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`TrafficSync API listening on http://localhost:${port}`)
})
