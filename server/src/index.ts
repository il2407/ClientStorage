import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRoutes from "./routes/users";
import { createTables } from "./db/init";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/users", userRoutes);

createTables();

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
