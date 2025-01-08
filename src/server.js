import express, { json, urlencoded } from "express";
import routerUsers from "./routes/routesUsers.js";
import routerTest from "./routes/routeTest.js";
import session from "express-session";
import cors from "cors";
import { settings } from "./settings/settings.js";
import { createTablesDbPostgres } from "./db/tables/tables.js";
import routerCourses from "./routes/routesCourses.js";
import routerEnrollments from "./routes/routesEnrollments.js";

const app = express();
const port = settings.server.serverPort;

const corsOptions = {
  origin: settings.cors.origin,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  session({
    secret: settings.jwt.secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

app.use("/users", routerUsers);
app.use("/test", routerTest);
app.use("/courses", routerCourses);
app.use("/enrollments", routerEnrollments);

(async () => {
  try {
    await createTablesDbPostgres();
  } catch (error) {
    console.error("Error initializing the database:", error);
    console.warn(
      "The server will start, but some features may not work without the database."
    );
  }
})();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
