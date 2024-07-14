import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/issues', async (req, res) => {
  const issues = await prisma.issue.findMany();
  return res.json(issues);
});

app.get('/issues/:id', async (req, res) => {
  const { id } = req.params;
  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  res.json(issue);
});

app.post('/issues', async (req, res) => {
  const { title, status } = req.body;

  const result = await prisma.issue.create({
    data: {
      title,
      status,
    },
  });

  res.json(result);
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
