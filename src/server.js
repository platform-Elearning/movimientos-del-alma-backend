import express, { json, urlencoded } from "express";
import routerUsers from "./routes/routesUsers.js";
import routerTest from "./routes/routeTest.js";
import session from "express-session";
import cors from "cors";
import { settings } from "./settings/settings.js";
import { createTablesDbPostgres } from "./db/tables/tables.js";
import routerCourses from "./routes/routesCourses.js";
import routerEnrollments from "./routes/routesEnrollments.js";
import logger from "./utils/logger.js";

const app = express();
const port = settings.server.serverPort;

const corsOptions = {
  origin: 'https://restcountries.com/v3.1/all', // Reemplaza con tu dominio
  optionsSuccessStatus: 200,
  origin: settings.cors.origin,
  credentials: true,
};


app.get('/v3.1/all', (req, res) => {
  // Tu lógica para manejar la solicitud
  res.json({ message: 'Hello World' });
});

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
    logger.warn(
      "The server will start, but some features may not work without the database."
    );
  }
})();

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
