import express from "express";
import { routes } from "./routes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());
app.use("/", routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
