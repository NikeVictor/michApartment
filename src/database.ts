require("dotenv").config();
import { Sequelize, DataTypes } from "sequelize";
import { init } from "./models/users.model";

const POSTGRES_HOST=process.env.POSTGRES_HOST
const POSTGRES_PORT=process.env.POSTGRES_PORT
const POSTGRES_USER= process.env.POSTGRES_USER
const POSTGRES_PASSWORD= process.env.POSTGRES_PASSWORD
const POSTGRES_DB=process.env.POSTGRES_DB

const POSTGRES_URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public`;
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