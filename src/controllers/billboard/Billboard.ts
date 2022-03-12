import { UNPROCESSABLE_ENTITY, OK, INTERNAL_SERVER_ERROR } from 'http-status';
import { Response, Request, Router, response } from 'express';

import BaseController from '@src/controllers/BaseController';

export default class Billboard extends BaseController {
  private name: string = 'billboard';
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
    return res.sendStatus(200);
  }
}
