import { HttpError } from '@src/exceptions/http/HttpError';
import { NotFound } from '@src/exceptions/http/NotFound/NotFound';
import { UnprocessableEntity } from '@src/exceptions/http/UnprocessableEntity/UnprocessableEntity';
import {
  BillboardReponse,
  NormalizedBillboard,
} from '@src/interfaces/Billboard';
import { IErrorGeneric, IErrorResponse } from '@src/interfaces/Error';
import * as httpUtil from '@src/util/Request';

export class Billboard {
  readonly billboardApiRange: string = '1-1';
  readonly billboardApiUrl: string =
    'https://billboard-api2.p.rapidapi.com/hot-100';
  readonly billboardApiHost: string = 'billboard-api2.p.rapidapi.com';

  constructor(protected request = new httpUtil.Request()) {}

  public async getTopHundred(date: string): Promise<NormalizedBillboard> {
    const validDate = this.isValidDate(date);

    if (!validDate) {
      throw new UnprocessableEntity(
        'Invalid date format. Should be YYYY-MM-DD'
      );
    }

    try {
      const response = await this.request.get<BillboardReponse>(
        `${this.billboardApiUrl}?range=${this.billboardApiRange}&date=${date}`,
        {
          headers: {
            'x-rapidapi-host': this.billboardApiHost,
            'x-rapidapi-key': process.env.BILLBOARD_KEY
              ? process.env.BILLBOARD_KEY
              : 'secret-cat',
          },
        }
      );

      if (response.data && response.data['ERROR']) {
        throw new UnprocessableEntity('Billboard service error');
      }

      return this.normalizeResponse(response.data);
    } catch (data) {
      const err = data as IErrorGeneric;
      if (err.response) {
        const errResponse = data as IErrorResponse;
        throw new HttpError(
          errResponse.response.data.message,
          errResponse.response.status
        );
      }

      throw new HttpError(err ? err.message : 'Unexpeted Error');
    }
  }

  private isValidDate(date: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (date.match(regex) === null) {
      return false;
    }
    const dateObj = new Date(date);

    const timestamp = dateObj.getTime();

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
      return false;
    }

    return dateObj.toISOString().startsWith(date);
  }

  private normalizeResponse(
    billboardResponse: BillboardReponse
  ): NormalizedBillboard {
    const response = billboardResponse.content['1'];
    if (!response) {
      throw new NotFound('Not able to find the billboard top 1 for that day!');
    }

    return {
      artist: response.artist,
      title: response.title,
      peak_position: response['peak position'],
      weeks_at_num_1: response['weeks at no.1'],
      rank: response.rank,
      weeks_on_chart: response['weeks on chart'],
    };
  }
}
