require("dotenv").config();
import { Sequelize, DataTypes } from "sequelize";
import { init } from "./models/users.model";

const POSTGRES_URL = process.env.DATABASE_URL as string;

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