import express, { json, urlencoded } from "express";
import routerUsers from "./routes/routesUsers.js";
import routerTest from "./routes/routeTest.js";
import session from "express-session";
import cors from "cors";
import { settings } from "./settings/settings.js";
import routerCourses from "./routes/routesCourses.js";
import routerEnrollments from "./routes/routesEnrollments.js";
import routerReport from "./routes/routesReport.js";

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
/* Rutas */
app.use("/users", routerUsers);
app.use("/test", routerTest);
app.use("/courses", routerCourses);
app.use("/enrollments", routerEnrollments);
app.use("/report-problem", routerReport);

export default app;
