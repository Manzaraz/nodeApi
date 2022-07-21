import express from "express";
import ip from "ip";
import dotenv from "dotenv";
import cors from "cors";
import Response from "./domain/response.js";
import logger from "./utils/logger.js";
import HttpStatus from "./controler/patient.controler.js";

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    new Response(
      HttpStatus.OK.code,
      HttpStatus.OK.status,
      "Patient API , v1.0.0 - All Systems Go!"
    )
  );
});

app.listen(PORT, () => {
  logger.info(`Server is running on: ${ip.address()}:${PORT}`);
});
