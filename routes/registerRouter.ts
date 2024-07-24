import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const registerRouter = express.Router();

const prisma = new PrismaClient();

registerRouter.route('/').post(async (req, res) => {
  const { email, password } = req.body;

  const emailExist = await prisma.user.findUnique({ where: { email: email } });

  if (emailExist) {
    return res.status(409).json({ error: 'Email already exists.' });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
      },
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export { registerRouter };
