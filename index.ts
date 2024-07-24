import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { registerRouter, issueRouter, loginRouter } from './routes';
import { checkJwtAuth } from './middlewares/checkJwtAuth';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/issues', checkJwtAuth, issueRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
