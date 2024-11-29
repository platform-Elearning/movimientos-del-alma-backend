import express, { json, urlencoded } from "express";
import routerUsers from "./routes/routesUsers.js";
import routerTest from "./routes/routeTest.js";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import { settings } from "./settings/settings.js";
import { createTablesDbPostgres } from "./db/tables/tables.js";

const app = express();
const port = settings.server.serverPort || 8080;

const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true, 
};
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  session({
    secret: "KJKSZPJ1",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

app.use("/users", routerUsers);
app.use("/test", routerTest);

(async () => {
  try {
    await createTablesDbPostgres();
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing the database:", error);
    console.warn("The server will start, but some features may not work without the database.");
  }
})();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});