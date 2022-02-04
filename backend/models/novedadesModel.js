var pool = require('./db');

async function getNovedades() {
  var query = 'SELECT * FROM novedades ORDER BY id ASC';
  var rows = await pool.query(query);
  return rows;
}

async function insertNovedad(obj) {
  try {
    var query = 'INSERT INTO novedades SET ? ';
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getNovedadById(id) {
  var query = 'SELECT * FROM novedades WHERE id = ? ';
  var rows = await pool.query(query, [id]);
  return rows[0];
}

async function modificarNovedadById(obj, id) {
  try {
    var query = 'UPDATE novedades SET ? WHERE id=?';
    var rows = await pool.query(query, [obj, id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function deleteNovedadById(id) {
  var query = 'DELETE FROM novedades WHERE id = ?';
  var rows = await pool.query(query, [id]);
  return rows;
}

module.exports = {
  getNovedades,
  insertNovedad,
  getNovedadById,
  modificarNovedadById,
  deleteNovedadById,
};
