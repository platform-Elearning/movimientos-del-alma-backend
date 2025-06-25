import { Router } from "express";
import { authenticateToken, isAdmin } from "../auth/auth.js";
import { getCoursesWithModules } from "../crud/crudCourses.js";

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
routerTest
  .route("/protected")
  .get(authenticateToken, isAdmin, async (req, res) => {
    console.log("Route protected ok");
    res.status(200).send("Acceso permitido");
  });

routerTest.route("/test").get(async (req, res) => {
  try {
    const response = await getCoursesWithModules();
    console.log(response);

    return res.status(200).json("LLEGO EL GET");
  } catch (error) {
    console.error("Error in /test route:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default routerTest;
