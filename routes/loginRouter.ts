import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const loginRouter = express.Router();

const prisma = new PrismaClient();

loginRouter.route('/').post(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    return res.status(200).json({ status: 'User logged in' });
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

export { loginRouter };
