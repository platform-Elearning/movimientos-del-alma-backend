import bcrypt from "bcrypt";
import logger from "../utils/logger.js";

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const validatePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

const authLogin = async (password, userPW) => {
  if (validatePassword(password, userPW)) {
    logger.info("Password validated");
    return true;
  } else {
    logger.warn("Password not validated");
    return false;
  }
};

export const authFunc = { hashPassword, validatePassword, authLogin };
