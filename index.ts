import express from 'express';
import cors from 'cors';
import { issueRouter } from './routes/issueRouter';
import { authRouter } from './routes/authRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/issues', issueRouter);
app.use('/register', authRouter);

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
