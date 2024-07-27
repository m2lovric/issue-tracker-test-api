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
  .get(async (req: ReqWithUser, res) => {
    const issues = await prisma.issue.findMany();
    return res.json(issues);
  })
  .post(async (req, res) => {
    const { title, status, userId } = req.body;

    const result = await prisma.issue.create({
      data: {
        title,
        status,
        userId,
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
