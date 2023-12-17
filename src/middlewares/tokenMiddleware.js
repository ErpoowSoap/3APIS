import jwt from "jsonwebtoken";

export function tokenMiddleware(req, res, next) {
    const token = req.cookies.authorization;

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, 'ProjetRailRoad', (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};
