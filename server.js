import dotenv from "dotenv";
import express from "express";
import router from "./src/app.js";
import connectToDatabase from "./src/config/db.js";
import cors from "cors";


dotenv.config();
connectToDatabase();


const port = process.env.PORT || 4000;
const app = express();


const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // Enable sending cookies from the frontend
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api", router);


app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});