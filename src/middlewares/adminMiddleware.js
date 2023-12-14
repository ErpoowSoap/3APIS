export function adminMiddleware(req, res, next) {
  const authorization = req.headers["authorization"];
  if (!authorization || authorization !== "Admin") {
    return res.status(403).json("Forbidden");
  }

  next();
}
