import UserManager from "../Dao/UserManager.js";
import bcrypt from "bcrypt";

export const login = async (request, response) => {
  const { email, password } = request.body;
  if (!email && !password) {
    throw new Error("Email and Password invalid format.");
  }

  const manager = new UserManager();
  const user = await manager.getOneByEmail(email);
  const isHashedPassword = await bcrypt.compare(password, user.password);

  if (!isHashedPassword) {
    return response.status(401).send({ message: "Login failed, invalid password." });
  }

  request.session.user = { email };

  response.send({ message: "Login success!" });
};

export const logout = async (request, response) => {
  request.session.destroy((err) => {
    if (!err) {
      return response.send({ message: "Logout ok!" });
    }

    response.send({ message: "Logout error!", body: err });
  });
};

export const signup = async (request, response) => {
  const manager = new UserManager();

  const payload = {
    ...request.body,
    password: await bcrypt.hash(request.body.password, 10),
  };

  const user = await manager.create(payload);

  response.status(201).send({ status: "success", user, message: "User created." });
};