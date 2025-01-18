import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  console.error("Secret key is not defined. Check your environment variables.");
  throw new Error("SECRET_KEY is required");
}

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token =
    authHeader?.split(" ")[1] || 
    req.cookies?.token

  if (!token) {
    return res.status(401).json({ error: "Token not found" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.status(403).json({ error: "Token validation failed" });
    }
    req.user = user;
    next();
  });
};