import { HttpError } from '@src/exceptions/http/HttpError';
import { UnprocessableEntity } from '@src/exceptions/http/UnprocessableEntity/UnprocessableEntity';
import * as httpUtil from '@src/util/Request';

export class Youtube {
  readonly baseUrl: string = 'https://www.googleapis.com/youtube/v3';
  readonly apiKey: string = '';

  constructor(protected request = new httpUtil.Request()) {}

  public async getYoutubeVideo(song: string): Promise<any[]> {
    try {
      song = this.formatSongString(song);
      
      const response = await this.request.get<any>(
        `${this.baseUrl}/search?part=snippet
        &q=${song}
        &type=video
        &videoCaption=closedCaption
        &key=${process.env.GOOGLE_API_KEY}`
      );

      return this.normalizeResponse(response.data);
    } catch (err: any) {
      throw new HttpError(err ? err.message : 'Unexpeted Error');
    }
  }

  private formatSongString(song: string): string {
    return song;
  }

  private normalizeResponse(youtubeResponse: any): any {
    return youtubeResponse;
  }
}
