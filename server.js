const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const todoRoutes = require("./routes/todo");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
const db = process.env.MONGO_URI;

const connectionDb = async () => {
  try {
    const connect = await mongoose.connect(db);
    if (connect) {
      console.log("db connected!");
    }
  } catch (err) {
    console.log("db connection failed!");
  }
};

connectionDb();

app.use("/api/v1/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is Listening on PORT: ${PORT}`);
});
