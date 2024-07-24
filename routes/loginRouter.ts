import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const loginRouter = express.Router();

const prisma = new PrismaClient();

loginRouter.route('/').post(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
    res.cookie('token', token, { httpOnly: true });
    return res.status(200).json({ status: 'User logged in' });
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

export { loginRouter };
