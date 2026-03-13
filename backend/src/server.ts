import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./routes/chat.route.js";
import logger from "./utils/logger.js";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/auth.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info("Incoming request", { method: req.method, path: req.path });
  next();
});

app.get("/", (req, res) => {
  res.send("Travel Agent AI Backend is running successfully!");
});

app.use("/api", chatRoute, authRoute);

const startServer = async () => {
  try {
    await connectDB(); // wait for MongoDB

    app.listen(PORT, () => {
      logger.info(`Server started on http://localhost:${PORT}`);
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    logger.error("Failed to start server", { error });
    process.exit(1);
  }
};

startServer();