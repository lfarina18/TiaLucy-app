const pool = require('./db');
const md5 = require('md5');

async function getUserByUsernameAndPassword(user, password) {
  try {
    const query =
      'SELECT * FROM usuarios WHERE usuario = ? AND password = ? LIMIT 1';
    const rows = await pool.query(query, [user, md5(password)]);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = { getUserByUsernameAndPassword };
