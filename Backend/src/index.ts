import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToDatabase from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import catchErrors from "./utils/catchErrors";
import { NOT_FOUND, OK } from "./constants/http";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import authenticate from "./middleware/authenticate";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.get(
  "/",
  ((req, res, next) => {
    res.status(OK).json({
      status: "Healthy",
    });
  })
);

app.use("/auth", authRoutes)
app.use("/books", authenticate, bookRoutes)

app.use((req, res) => {
  res.status(NOT_FOUND).send({
    message: 'Route not found',
  });
});

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
