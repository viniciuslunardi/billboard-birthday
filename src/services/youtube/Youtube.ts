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
      throw new HttpError(err ? err.message : 'Unexpeted Error');
    }
  }

  private formatSongString(billboardData: any): string {
    return `${billboardData.artist} - ${billboardData.title}`;
  }

  private normalizeResponse(youtubeResponse: any): any {
    const video = youtubeResponse.items[0];

    if (!video) {
      throw new NotFound('Not able to find youtube video!');
    }

    const videoId = video.id.videoId;
    const link = `${this.youtubeBaseUrl}${videoId}`;
    const title = video.snippet.title;
    return {
      title,
      link,
    };
  }
}
