import bcrypt from "bcrypt";

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const validatePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

const authLogin = async (password, userPW) => {
  if (validatePassword(password, userPW)) {
    console.log('Password validated')
    return true
  } else {
    console.log('Password not validated')
    return false
  }
};

export const authFunc = { hashPassword, validatePassword, authLogin};