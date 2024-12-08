import express, { json, urlencoded } from "express";
import routerUsers from "./routes/routesUsers.js";
import routerTest from "./routes/routeTest.js";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import { settings } from "./settings/settings.js";
import { createTablesDbPostgres } from "./db/tables/tables.js";
import routerCourses from "./routes/routesCourses.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = settings.server.serverPort || 8080;

const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRETKEY,
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

(async () => {
  try {
    await createTablesDbPostgres();
    await createAdminUser();
    console.log(`
      ╔════════════════════════════════════════╗
      ║   Database initialized successfully    ║
      ╚════════════════════════════════════════╝
      `);
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


// ------------------- funtion admin creation  -----------------------------

const createAdminUser = async () => {
  // Función de sleep
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  try {
    await sleep(5000);
    const response = await fetch('http://localhost:8080/users/createAdmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: "1",
        email: "admin@admin.com",
        password: "admin"
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.errorMessage === "User already exist") {
        console.log("Admin user already exists.");
      } else {
        throw new Error("Failed to create admin user");
      }
    } else {
      const data = await response.json();
      console.log("Admin user created:", data);
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

