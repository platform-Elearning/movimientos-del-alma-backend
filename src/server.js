import express, { json, urlencoded } from "express";
import routerUsers from "./routes/routesUsers.js";
import routerTest from "./routes/routeTest.js";
import session from "express-session";
import cors from "cors";
import { settings } from "./settings/settings.js";
import { createUsersTable, createStudentsTable } from "./tables/tables.js";

const app = express();
const port = settings.server.serverPort || 8080;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  session({
    secret: "KJKSZPJ1", // CHANGE FOR ENV
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

app.use("/users", routerUsers);
app.use("/test", routerTest);

async function startServer() {
  try {
    await createUsersTable();
    await createStudentsTable();
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

startServer();
