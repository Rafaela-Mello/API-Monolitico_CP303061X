const db = require('../database/db');

class UserService {

  createUser(nome, email) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO usuarios (nome, email) VALUES (?, ?)`;
      db.run(sql, [nome, email], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, nome, email, status: 'ativo' });
        }
      });
    });
  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM usuarios`, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  getUserById(id) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM usuarios WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  updateUser(id, nome, status) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE usuarios SET nome = ?, status = ? WHERE id = ?`;
      db.run(sql, [nome, status, id], function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }

  deactivateUser(id) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE usuarios SET status = 'Inativo' WHERE id = ?`;
      db.run(sql, [id], function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }

}

module.exports = new UserService();