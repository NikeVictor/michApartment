import 'reflect-metadata';
import './tsyringe.container';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB, sequelize } from './database';
import { adminRoutes } from './routes/admin.routes';
import { subUserRoutes } from './routes/subUser.routes';
import swaggerUI from "swagger-ui-express";
import { swaggerDocument } from "./swagger-document";

dotenv.config();

const app: Express = express();
app.use(express.json());

app.use('/api/v1/', adminRoutes);
app.use('/api/v1/', subUserRoutes);

const port = process.env.API_PORT || 8000;

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.get("/", async (req: Request, res: Response) => {
  let dbConnected = false;
  try {
    const [results]: any[] = await sequelize.query("SELECT 1 + 1;");
    dbConnected = results.length && results[0]["?column?"] === 2;
  } catch (error) {
    console.error("Database query error:", error);
  }

  res.json({
    date: new Date().toISOString(),
    status: "up",
    dbConnected,
    url: `${req.protocol}://${req.hostname}`,
  });
});

app.listen(port, async () => {
  console.log(`🚀Server started successfully on port ${port}`);
  await connectDB();
});
