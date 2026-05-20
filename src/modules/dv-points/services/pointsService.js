const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function addPoints(user_id, store_id, action, value) {
  try {
    await pool.query(`
      INSERT INTO dv_points_history
      (id, user_id, action, points)
      VALUES ($1, $2, $3, $4)
    `, [uuidv4(), user_id, action, value]);

    await pool.query(`
      UPDATE dv_points
      SET points = points + $1
      WHERE user_id = $2
    `, [value, user_id]);

    return { success: true, message: 'Pontos adicionados com sucesso' };
  } catch (error) {
    console.error('Erro ao adicionar pontos:', error);
    throw error;
  }
}

async function getUserPoints(user_id) {
  try {
    const result = await pool.query(`
      SELECT * FROM dv_points WHERE user_id = $1
    `, [user_id]);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao buscar pontos:', error);
    throw error;
  }
}

async function getPointsHistory(user_id) {
  try {
    const result = await pool.query(`
      SELECT * FROM dv_points_history WHERE user_id = $1 ORDER BY created_at DESC
    `, [user_id]);
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    throw error;
  }
}

module.exports = {
  addPoints,
  getUserPoints,
  getPointsHistory
};
