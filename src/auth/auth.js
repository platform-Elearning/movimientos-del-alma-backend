import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  logger.error("Secret key is not defined. Check your environment variables.", {
    stack: error.stack,
  });
  throw new Error("SECRET_KEY is required");
}

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Authentication required",
      details: "Token must be provided in Authorization header (Bearer token)",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      logger.error(`JWT Error: ${error.name}`, {
        path: req.path,
        ip: req.ip,
      });

      const message =
        error instanceof jwt.TokenExpiredError
          ? "Token expired. Please log in again"
          : "Invalid token";

      return res.status(403).json({
        error: "Forbidden",
        details: message,
      });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  });
};

export const checkAnyRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Forbidden",
        details: `Requires one of these roles: ${allowedRoles.join(", ")}`,
        yourRole: req.user.role,
      });
    }

    next();
  };
};

export const isAdmin = checkAnyRole(["admin"]);
export const isTeacher = checkAnyRole(["teacher", "admin"]);
export const isStudent = checkAnyRole(["student", "teacher", "admin"]);
