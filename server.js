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
const db = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

const connectionDb = async () => {
  try {
    console.log("Trying to connect to:", db);
    const connectionInstance = await mongoose.connect(`${db}/${dbName}`);
    console.log(
      `\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
  }
};

connectionDb();

app.use("/api/v1/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is Listening on PORT: ${PORT}`);
});
