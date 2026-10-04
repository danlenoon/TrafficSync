// Data access repository for TrafficSync simulations

export async function getAll(pool) {
  const result = await pool.query(
    'SELECT * FROM simulations ORDER BY created_at DESC'
  )
  return result.rows
}

export async function getById(pool, id) {
  const result = await pool.query('SELECT * FROM simulations WHERE id = $1', [id])
  return result.rows[0] ?? null
}

export async function create(pool, { title, road_name, data }) {
  const result = await pool.query(
    `INSERT INTO simulations (title, road_name, data)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, road_name ?? title, data ?? {}]
  )
  return result.rows[0]
}

export async function update(pool, id, { title, road_name, data }) {
  const result = await pool.query(
    `UPDATE simulations
     SET title = $1, road_name = $2, data = $3, updated_at = now()
     WHERE id = $4
     RETURNING *`,
    [title, road_name ?? title, data ?? {}, id]
  )
  return result.rows[0] ?? null
}

export async function remove(pool, id) {
  const result = await pool.query(
    'DELETE FROM simulations WHERE id = $1 RETURNING id',
    [id]
  )
  return result.rowCount > 0
}
