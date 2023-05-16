const auth = (request, response, next) => {
  console.log(request.session);
  if (request.session && request.session.admin) {
    return next();
  }
  return response.status(401).send({ message: "Authentication Error!" });
};
export default auth;
