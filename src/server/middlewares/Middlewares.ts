import { Request, Response, NextFunction } from 'express';

const missingRouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    return res.status(404).send('This route is not mapped! Check README.md file for the documentation.')
};

export { missingRouteMiddleware };
