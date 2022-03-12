import httpStatus, {
  UNPROCESSABLE_ENTITY,
  OK,
  INTERNAL_SERVER_ERROR,
} from 'http-status';
import { Response, Request, Router } from 'express';

import BaseController from '@src/controllers/BaseController';
import { Billboard } from '@src/services/billboard/Billboard';

export default class BillboardBirthday extends BaseController {
  private name: string = 'billboard-birthday';
  private billboard: Billboard = new Billboard();

  constructor(router: Router) {
    super(router);
    this.initBinds();
  }

  public getName(): string {
    return this.name;
  }

  protected initBinds(): void {
    this.router.get(`/${this.name}/top-hundred`, this.getTopHundred.bind(this));
  }

  async getTopHundred(req: Request, res: Response): Promise<Response> {
    try {
      const { date } = req.query;

      if (!date) {
        return res
          .status(UNPROCESSABLE_ENTITY)
          .send('You must enter a date to check the top 1 chart of that day');
      }

      const response = await this.billboard.getTopHundred(date);

      return res.status(OK).send(response);
    } catch (err: any) {
      console.error(err);
      return res
        .status(err.code ? err.code : INTERNAL_SERVER_ERROR)
        .send(err && err.message ? err.message : '');
    }
  }
}
