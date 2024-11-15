import { Router } from "express";
import TableContainer from "../crud/crudTable.js";
import { authenticateToken, login, register } from "../auth/auth.js";

const router = Router();
const tableContainer = new TableContainer();

// TEST ROUTE
router
  .route("/test")
  .get((res) => {
    res.status(200).send("GET request successful");
  })
  .post((res) => {
    res.status(201).send("POST request successful");
  });

// ROUTE FOR REGISTER
router.route("/register").post(register);

// ROUTE FOR LOGIN
router.route("/login").post(login);

// ROUTE FOR CREATE TABLE
router.route("/createTable").post(async (req, res) => {
  try {
    const { nameTable, attributeName, attributeType } = req.body;

    console.log(nameTable, attributeName, attributeType);

    await tableContainer.createTable(nameTable, attributeName, attributeType);
    console.log("TABLE CREATED");
    res.status(200).send("POST request successful - /createTable");
  } catch (error) {
    console.error("ERROR request -/createTable", error);
    res.status(401).send("Unauthorized");
  }
});

router.route("/protected").get(authenticateToken, async (req, res) => {
  console.log('LA SOLICITUD LLEGA')
  res.send("PROTECTED ROUTE IS OK");
});

export default router;
