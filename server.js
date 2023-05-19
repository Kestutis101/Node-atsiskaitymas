import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./router/router.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MONGODB Connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
