import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../utils/logger.js";
import QUERY from "../query/patient.query.js";

const HttpStatus = {
  OK: { code: 200, status: "OK" },
  CREATED: { code: 201, status: "CREATED" },
  NO_CONTENT: { code: 204, status: "NO CONTENT" },
  BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
  NOT_FOUND: { code: 404, status: "NOT_FOUND" },
  INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};

export const getPatients = async (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, fetching all patients`);
  database.query(QUERY.SELECT_PATIENTS, (err, results) => {
    if (!results) {
      res
        .status(HttpStatus.NO_CONTENT.code)
        .send(
          new Response(
            HttpStatus.NO_CONTENT.code,
            HttpStatus.NO_CONTENT.status,
            "No patients found"
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            "Patients retrieved",
            { patients: results }
          )
        );
    }
  });
};
export default HttpStatus;
