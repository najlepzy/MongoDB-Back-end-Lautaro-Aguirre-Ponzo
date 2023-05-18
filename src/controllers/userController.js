import UserManager from "../Dao/userManager.js";

export const list = async  (requestuest, response) =>
{
    const { limit, page } = request.query;
    const manager = new UserManager();

    const users = await manager.paginate({ limit, page });

    response.send({ status: 'success', users: users.docs, ...users, docs: undefined });
};

export const getOne = async (request, response) =>
{
    const { id } = request.params;

    const manager = new UserManager();
    const user = await manager.getOne(id);

    response.send({ status: 'success', user });
};

export const save = async (request, response) =>
{
  const manager = new UserManager();
  const user = await manager.create(request.body);

  response.send({ status: 'success', user, message: 'User created.' })
};

export const update = async (request, response) =>
{
  const { id } = request.params;

  const manager = new UserManager();
  const responseult = await manager.updateOne(id, request.body);

  response.send({ status: 'success', responseult, message: 'User updated.' })
};

export const deleteOne = async (request, response) =>
{
  const { id } = request.params;

  const manager = new UserManager();
  await manager.deleteOne(id);

  response.send({ status: 'success', message: 'User deleted.' })
};