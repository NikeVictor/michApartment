require("dotenv").config();
import { Sequelize, DataTypes } from "sequelize";
import { init } from "./models/users.model";

const DB_HOST=process.env.POSTGRES_HOST
const DB_PORT=process.env.POSTGRES_PORT
const DB_USER= process.env.POSTGRES_USER
const DB_PASSWORD= process.env.POSTGRES_PASSWORD
const DB_NAME=process.env.POSTGRES_DB

const POSTGRES_URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public`;
if (!POSTGRES_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}
const sequelize = new Sequelize(POSTGRES_URL, {
  dialectOptions: {
    dialect: 'postgres'
  }
});
init.connectModelAttrs(sequelize);
async function connectDB() {
  try {
    await sequelize.authenticate();
    //console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export { connectDB, sequelize, Sequelize, DataTypes };