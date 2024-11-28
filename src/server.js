import express, { json, urlencoded } from "express";
import routerUsers from "./routes/routesUsers.js";
import routerTest from "./routes/routeTest.js";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import { settings } from "./settings/settings.js";
import { 
  createUserRoleType, 
  createEnrollmentStatusType, 
  createUsersTable, 
  createStudentsTable, 
  createCoursesTable, 
  createTeachersTable, 
  createEnrollmentsTable, 
  createPaymentMethodsTable, 
  createPaymentsTable, 
  createTeacherCoursesTable, 
  createCourseModulesTable, 
  createModuleVideosTable, 
  createLessonsTable 
} from "./db/tables/tables.js";

const app = express();
const port = settings.server.serverPort || 8080;
app.use(morgan('combined'));

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

const initializeTables = async () => {
  try {
    await createUserRoleType();
    await createEnrollmentStatusType();
    await createUsersTable();
    await createStudentsTable();
    await createCoursesTable();
    await createTeachersTable();
    await createEnrollmentsTable();
    await createPaymentMethodsTable();
    await createPaymentsTable();
    await createTeacherCoursesTable();
    await createCourseModulesTable();
    await createModuleVideosTable();
    await createLessonsTable();
    console.log("All tables initialized successfully.");
  } catch (error) {
    console.error("Error initializing tables:", error);
  }
};

initializeTables();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});