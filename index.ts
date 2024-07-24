import express from 'express';
import cors from 'cors';
import { registerRouter, issueRouter, loginRouter } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/issues', issueRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
