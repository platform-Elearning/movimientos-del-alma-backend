import { Router } from "express";
import { authenticateToken } from "../auth/auth.js";
import { checkUserExist } from "../crud/crudUsers.js";
import { changePasswordController } from "../controllers/userController.js";

const routerTest = Router();

// TEST ROUTE
routerTest
  .route("")
  .get((req, res) => {
    // Usamos 'req' y 'res'
    res.status(200).send("GET request successful");
  })
  .post((req, res) => {
    // Usamos 'req' y 'res'
    res.status(201).send("POST request successful");
  });

// FUNCTION TEST
routerTest.route("/function").post(changePasswordController);

// TEST PROTECTED ROUTE
routerTest.route("/protected").get(authenticateToken, async (res) => {
  console.log("Route protected ok");
  res.send("PROTECTED ROUTE IS OK");
});

export default routerTest;
