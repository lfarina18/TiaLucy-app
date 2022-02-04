var pool = require('./db');

async function getImagenes() {
  var query = 'SELECT * FROM imagenesDB ORDER BY id ASC';
  var rows = await pool.query(query);
  return rows;
}

async function insertImagen(obj) {
  try {
    var query = 'INSERT INTO imagenesDB SET ? ';
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getImagenById(id) {
  var query = 'SELECT * FROM imagenesDB WHERE id = ? ';
  var rows = await pool.query(query, [id]);
  return rows[0];
}

async function modificarImagenById(obj, id) {
  try {
    var query = 'UPDATE imagenesDB SET ? WHERE id=?';
    var rows = await pool.query(query, [obj, id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function deleteImagenById(id) {
  var query = 'DELETE FROM imagenesDB WHERE id = ?';
  var rows = await pool.query(query, [id]);
  return rows;
}

module.exports = {
  getImagenes,
  insertImagen,
  getImagenById,
  modificarImagenById,
  deleteImagenById,
};
