import httpStatus, {
  UNPROCESSABLE_ENTITY,
  OK,
  INTERNAL_SERVER_ERROR,
} from 'http-status';
import { Response, Request, Router } from 'express';

import BaseController from '@src/controllers/BaseController';
import { Billboard } from '@src/services/billboard/Billboard';
import { Youtube } from '@src/services/youtube/Youtube';

export default class BillboardBirthday extends BaseController {
  private name: string = 'billboard-birthday';
  private billboard: Billboard = new Billboard();
  private youtube: Youtube = new Youtube();

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

      const billboardData = await this.billboard.getTopHundred(date);
      const youtubeData = await this.youtube.getYoutubeVideo(billboardData);

      console.log(youtubeData)
      const response = {
        ...billboardData,
        youtube: {
          ...youtubeData,
        },
      };

      return res.status(OK).send(response);
    } catch (err: any) {
      console.error(err);
      if (err.data) {
        return res
        .status(err.data.code || err.data.status || INTERNAL_SERVER_ERROR)
        .send(err.data.message || 'Unexpected Error');
      }
      return res
        .status(err.code || err.status || INTERNAL_SERVER_ERROR)
        .send(err.message || 'Unexpected Error');
    }
  }
}
