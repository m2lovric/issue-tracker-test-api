import express from 'express';
import cors from 'cors';
import { issueRouter } from './routes/issues';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/issues', issueRouter);

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
