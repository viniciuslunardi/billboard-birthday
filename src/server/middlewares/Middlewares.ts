import { Request, Response } from 'express';

const missingRouteMiddleware = (req: Request, res: Response) => {
  return res
    .status(404)
    .send(
      'This route is not mapped! Check README.md file for the documentation.'
    );
};

export { missingRouteMiddleware };
