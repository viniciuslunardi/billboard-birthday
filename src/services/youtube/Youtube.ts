import { HttpError } from '@src/exceptions/http/HttpError';
import { NotFound } from '@src/exceptions/http/NotFound/NotFound';
import { UnprocessableEntity } from '@src/exceptions/http/UnprocessableEntity/UnprocessableEntity';
import * as httpUtil from '@src/util/Request';

export class Youtube {
  readonly baseUrl: string = 'https://www.googleapis.com/youtube/v3';
  readonly apiKey: string = process.env.GOOGLE_API_KEY || 'secret-cat';
  readonly youtubeBaseUrl: string = 'https://www.youtube.com/watch?v=';

  constructor(protected request = new httpUtil.Request()) {}

  public async getYoutubeVideo(billboardData: any): Promise<any[]> {
    try {
      const song = this.formatSongString(billboardData);

      const response = await this.request.get<any>(
        `${this.baseUrl}/search?part=snippet&q=${song}&type=video&key=${this.apiKey}`
      );
      
      return this.normalizeResponse(response.data);
    } catch (err: any) {
      if (err.response) {
        const response = err.response;

        throw new HttpError(response.data.error.message, response.status);
      } else if (err.data) {
        throw new HttpError(err.data.error.message, err.data.error.status);
      }

      throw new HttpError(
        err.message || 'Unexpeted Error',
        err.code || err.status || 500
      );
    }
  }

  private formatSongString(billboardData: any): string {
    return `${billboardData.artist} - ${billboardData.title}`;
  }

  private normalizeResponse(youtubeResponse: any): any {
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
