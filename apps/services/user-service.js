const User = require("../models/user-model");
const validate = require("../validations/validate");
const {
  reqisterUserValidation,
  loginUserValidation,
  usernameValidation
} = require("../validations/user-validate");
const ResponseError = require("../errors/response-error");
const bcrypt = require("bcrypt");

const register =async (reqBody) => {
  const { username } = reqBody;
  
    let users = validate(reqisterUserValidation, reqBody);
     
    const userExists = await User.findUsername({ username });
    if (userExists) {
      throw new ResponseError(400,"User already exists");
    }
    //save register
    await User.register(users);

  return ;
};

const login = async (reqBody) => {
  const login = validate(loginUserValidation, reqBody);

  const user = await User.findUsername({username:login.username});
  if (!user) {
    throw new ResponseError(401, "Invalid username or password");
  }

  const isPassValid = await bcrypt.compare(login.password, user.password);
  if (!isPassValid) {
    throw new ResponseError(401, "Invalid username or password");
  }

  let {token} = await User.login(login);
  return { token: token };
};

const logout = async ({username}) => {
   
  const userValid = validate(usernameValidation, {username});

  const user = await User.findUsername({username:userValid.username});
  if (!user) {
    throw new ResponseError(401, "User not found");
  }

  await User.logout(userValid);
  return;
};

module.exports = {
  register,
  login,
  logout,
};