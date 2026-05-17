import { Sequelize } from "sequelize";

const db = new Sequelize("db_it", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db; //ready to export in other files.
