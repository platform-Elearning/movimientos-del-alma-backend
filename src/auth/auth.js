import jwt from "jsonwebtoken";

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
