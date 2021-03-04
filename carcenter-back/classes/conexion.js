require('dotenv').config();
const oracledb = require('oracledb');

class Conexion {
  static conectado = false;
  user = process.env.DB_USER;
  password = process.env.DB_PASS;
  db_URI = process.env.DB_URI;
  conexionBD;

  constructor() {
    this.conexionBD = this.conectarBD();
  }

  async conectarBD() {
    try {
      return await oracledb.getConnection({
        user: this.user,
        password: this.password,
        connectString: this.db_URI,
      });
    } catch (error) {
      console.log('Error conectando con la Base de Datos');
      console.log(error);
    }
  }

  async realizarConsulta(query, bindParams = [], commit = false) {
    if (!commit) {
      return await (await this.conexionBD).execute(query, bindParams);
    } else {
      return await (await this.conexionBD).execute(query, bindParams, {
        autoCommit: true,
      });
    }
  }
}

module.exports = Conexion;
