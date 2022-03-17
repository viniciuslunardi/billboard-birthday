import { UNPROCESSABLE_ENTITY, OK, INTERNAL_SERVER_ERROR } from 'http-status';
import { Response, Request, Router } from 'express';

import BaseController from '@src/controllers/BaseController';
import { Billboard } from '@src/services/billboard/Billboard';
import { Youtube } from '@src/services/youtube/Youtube';
import { IErrorData, IErrorGeneric } from '@src/interfaces/Error';
import { logger } from '@src/util/Logger';

export default class BillboardBirthday extends BaseController {
  private name = 'billboard-birthday';
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
      const date = req.query.date as string;

      if (!date) {
        logger.error('Tried to fetch Billboard chart without a date.');

        return res
          .status(UNPROCESSABLE_ENTITY)
          .send('You must enter a date to check the top 1 chart of that day');
      }

      logger.info(`Fetching Billboard chart from ${date}...`);

      const billboardData = await this.billboard.getTopHundred(date);
      const youtubeData = await this.youtube.getYoutubeVideo(billboardData);

      const response = {
        ...billboardData,
        youtube: {
          ...youtubeData,
        },
      };

      logger.info(
        `Fetched Billboard data with response: ${JSON.stringify(response)}`
      );

      return res.status(OK).send(response);
    } catch (data) {
      const err = data as IErrorData;

      if (err.data) {
        return res
          .status(err.data.code || err.data.status || INTERNAL_SERVER_ERROR)
          .send(err.data.message || 'Unexpected Error');
      }

      const defaultErr = data as IErrorGeneric;
      return res
        .status(defaultErr.code || defaultErr.status || INTERNAL_SERVER_ERROR)
        .send(defaultErr.message || 'Unexpected Error');
    }
  }
}
