import express, { json, urlencoded } from "express";
import router from "./routes/routes.js";
import session from "express-session";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors())
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(session({
  secret: 'KJKSZPJ1', // CHANGE FOR ENV
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 600000
  }
}))

app.use("/", router);

async function startServer() {
  try {
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });

  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

startServer();
