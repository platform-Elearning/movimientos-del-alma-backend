import UserContainer from "../crud/crudUser.js";
import { authFunc } from "../passwordStrategy/passwordStrategy.js";
import jwt from "jsonwebtoken";

const secretKey = "aleatorykey1";
const userContainer = new UserContainer();

export const register = async (req, res) => {
  try {
    const { DNI, Name, Phone, Address, Email, User, Password, Role } = req.body;

    if (!DNI || !Name || !Phone || !Address || !Email || !User || !Password || !Role) {
      return res.status(400).send("Todos los campos son requeridos");
    }

    if (Role !== 'admin' && Role !== 'cliente') {
      return res.status(400).send("El rol debe ser 'admin' o 'cliente'");
    }

    const dniNumber = parseInt(DNI, 10);
    if (isNaN(dniNumber)) {
      return res.status(400).send("DNI debe ser un número válido");
    }


    await userContainer.createUser(
      dniNumber,
      Name,
      Phone,
      Address,
      Email,
      User,
      Password,
      Role
    );

    res.status(200).send("Usuario registrado con éxito - /register");
  } catch (error) {
    console.log("ERROR en la solicitud - /register", error);
    res.status(500).send("Error en el servidor");
  }
};

export const login = async (req, res) => {
  
  try {
    const { DNI, Password } = req.body;
    const tableName = "CustomersTABLE"; //ACA PUEDO HACER UNA FUCION TYPETABLE

    // OBTENGO EL NOMBRE DE USUARIO
    const dataUser = await userContainer.getUser(tableName, DNI);

    // OBTENGO LA PASSWORD DE LA BASE DE DATOS
    const userPassword = await userContainer.getPassword(tableName, DNI);

    // OBTENGO TRUE O FLASE
    const isValidated = await authFunc.authLogin(Password, userPassword);

    if (!isValidated) {
      return res.status(401).send("Invalid Credentials");
      
    }

    console.log(dataUser.Role)

    const token = jwt.sign({ username: dataUser.userName, admin: dataUser.Role, email: dataUser.email }, secretKey, {
      expiresIn: "1h",
    });

    res.json({ token });
    
  } catch (error) {
    console.log("ERROR request - /login", error);
    res.status(401).send("Unauthorized");
  }
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send("TOKEN NOT FOUND");

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send("TOKEN NOT VALIDATED");
    req.user = user;
    next();
  });
};
