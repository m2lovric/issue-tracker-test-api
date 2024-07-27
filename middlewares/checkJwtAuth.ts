import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const checkJwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    if (user) return next();
  } catch (err) {
    //res.clearCookie('token');
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export { checkJwtAuth };
