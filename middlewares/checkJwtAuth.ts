import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface ReqWithUser extends Request {
  user?: string | jwt.JwtPayload;
}

const checkJwtAuth = (req: ReqWithUser, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user;
    if (user) return next();
  } catch (err) {
    res.clearCookie('token');
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export { checkJwtAuth };
