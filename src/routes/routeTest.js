import { Router } from "express";
import { authenticateToken } from "../auth/auth.js";
import { getStudentWithDni } from "../crud/crudUsers.js";

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

// TEST PROTECTED ROUTE
routerTest.route("/protected").get(authenticateToken, async (res) => {
  console.log("Route protected ok");
  res.send("PROTECTED ROUTE IS OK");
  return true;
});

routerTest.route("/test").post(async (req, res) => {
  const { dni } = req.body;

  try {
    const student = await getStudentWithDni(dni);

    if (!student) {
      return res
        .status(404)
        .json({ message: `No student found with DNI: ${dni}` });
    }

    return res.status(200).json(student);
  } catch (error) {
    console.error("Error in /test route:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default routerTest;
