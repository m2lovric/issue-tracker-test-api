import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

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

    const token = jwt.sign(
      { id: result.id, email: result.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    return res.status(200).json({
      status: 'User registered successfully',
      user: { id: result.id, email: result.email },
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export { registerRouter };
