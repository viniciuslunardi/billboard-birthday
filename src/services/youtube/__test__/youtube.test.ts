import { BAD_REQUEST, NOT_FOUND } from 'http-status';

import { Youtube } from '@src/services/youtube/Youtube';
import * as httpUtil from '@src/util/request';

import youtubeSongResponse from '@test/fixtures/youtube/youtubeSongResponse.json';
import normalizedYoutubeResponse from '@test/fixtures/youtube/normalizedYoutubeResponse.json';

jest.mock('@src/util/Request');

describe('Youtube service', () => {
  const mockedRequest = new httpUtil.Request() as jest.Mocked<httpUtil.Request>;

  it('should return the normalized youtube response from youtube service', async () => {
    const song = 'Boogarins - Elogio a Instituição do Cinismo';

    mockedRequest.get.mockResolvedValue({
      data: youtubeSongResponse,
    } as httpUtil.Response);

    const youtube = new Youtube(mockedRequest);
    const response = await youtube.getYoutubeVideo(song);

    expect(response).toEqual(normalizedYoutubeResponse);
  });

  it('should get a youtube error from Youtube service when the request fail', async () => {
    const song = 'Boogarins - Elogio a Instituição do Cinismo';

    mockedRequest.get.mockRejectedValue({
      data: {
        error: {
          message: 'API key not valid. Please pass a valid API key.',
          code: BAD_REQUEST,
        },
      },
    } as httpUtil.Response);

    const youtube = new Youtube(mockedRequest);

    await expect(youtube.getYoutubeVideo(song)).rejects.toThrow(
      'API key not valid. Please pass a valid API key.'
    );
  });

  it('should inform that youtube service was not able to find the video from the song', async () => {
    try {
      const song = 'Boogarins - Elogio a Instituição do Cinismo';

      mockedRequest.get.mockResolvedValue({
        data: [],
      } as httpUtil.Response);

      const youtube = new Youtube(mockedRequest);
      await youtube.getYoutubeVideo(song);
    } catch (err: any) {
      expect(err.message).toBe('Not able to find youtube video!');
      expect(err.code).toBe(NOT_FOUND);
    }
  });
});
