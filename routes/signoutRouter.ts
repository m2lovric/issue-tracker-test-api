import express from 'express';

const signoutRouter = express.Router();

signoutRouter.route('/').post(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
  });
  res.status(200).json({ message: 'Signed out successfully' });
});

export { signoutRouter };
