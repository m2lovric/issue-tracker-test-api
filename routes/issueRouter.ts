import express, { Request } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const issueRouter = express.Router();

const prisma = new PrismaClient();

export interface ReqWithUser extends Request {
  user?: string | jwt.JwtPayload;
}

issueRouter
  .route('/')
  .get(async (req, res) => {
    const id = req.headers['userid'] as string;
    if (id === undefined) return res.status(500);
    try {
      const issues = await prisma.issue.findMany({
        where: {
          userId: id,
        },
      });
      return res.json(issues);
    } catch (err) {}
  })
  .post(async (req, res) => {
    const { title, status, userId } = req.body;

    const result = await prisma.issue.create({
      data: {
        title,
        status,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.json(result);
  });

issueRouter.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  res.json(issue);
});

export { issueRouter };
