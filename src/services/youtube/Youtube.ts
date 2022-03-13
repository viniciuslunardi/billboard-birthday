import { HttpError } from '@src/exceptions/http/HttpError';
import { NotFound } from '@src/exceptions/http/NotFound/NotFound';
import { NormalizedBillboard } from '@src/interfaces/Billboard';
import {
  IErrorData,
  IErrorGeneric,
  IErrorResponse,
} from '@src/interfaces/Error';
import { NormalizedYoutube, YoutubeResponse } from '@src/interfaces/Youtube';
import * as httpUtil from '@src/util/Request';

export class Youtube {
  readonly baseUrl: string = 'https://www.googleapis.com/youtube/v3';
  readonly apiKey: string = process.env.GOOGLE_API_KEY || 'secret-cat';
  readonly youtubeBaseUrl: string = 'https://www.youtube.com/watch?v=';

  constructor(protected request = new httpUtil.Request()) {}

  public async getYoutubeVideo(
    billboardData: NormalizedBillboard
  ): Promise<NormalizedYoutube> {
    try {
      const song = this.formatSongString(billboardData);

      const response = await this.request.get<YoutubeResponse>(
        `${this.baseUrl}/search?part=snippet&q=${song}&type=video&key=${this.apiKey}`
      );

      return this.normalizeResponse(response.data);
    } catch (data) {
      const err = data as IErrorGeneric;

      if (err.response) {
        const errResponse = data as IErrorResponse;

        throw new HttpError(
          errResponse.response.data.error.message,
          errResponse.response.status
        );
      } else if (err.data) {
        const errData = data as IErrorData;

        throw new HttpError(
          errData.data.error.message,
          errData.data.error.status
        );
      }

      throw new HttpError(
        err.message || 'Unexpeted Error',
        err.code || err.status || 500
      );
    }
  }

  private formatSongString(billboardData: NormalizedBillboard): string {
    return `${billboardData.artist} - ${billboardData.title}`;
  }

  private normalizeResponse(
    youtubeResponse: YoutubeResponse
  ): NormalizedYoutube {
    if (
      !youtubeResponse ||
      !youtubeResponse.items ||
      !youtubeResponse.items[0]
    ) {
      throw new NotFound('Not able to find youtube video!');
    }

    const video = youtubeResponse.items[0];

    const videoId = video.id.videoId;
    const link = `${this.youtubeBaseUrl}${videoId}`;
    const title = video.snippet.title;
    return {
      title,
      link,
    };
  }
}
