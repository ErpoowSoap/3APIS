import jwt from "jsonwebtoken";

export function adminMiddleware(req, res, next) {
  const token = req.cookies.authorization;

  if (!token) {
    return res.status(401).json('no token provided');
  }

  try {
    const decoded = jwt.verify(token, 'ProjetRailRoad');

    if (decoded.role !== 'Admin') {
      return res.status(403).json('Forbidden');
    }

    next();
  } catch (error) {
    return res.status(401).json('Unauthorized');
  }
}