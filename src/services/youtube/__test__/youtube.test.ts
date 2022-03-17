import { BAD_REQUEST, NOT_FOUND } from 'http-status';

import { Youtube } from '@src/services/youtube/Youtube';
import * as httpUtil from '@src/util/Request';

import youtubeSongResponse from '@test/fixtures/youtube/youtubeSongResponse.json';
import normalizedYoutubeResponse from '@test/fixtures/youtube/normalizedYoutubeResponse.json';
import { NormalizedBillboard } from '@src/interfaces/Billboard';
import { IErrorGeneric } from '@src/interfaces/Error';

jest.mock('@src/util/Request');

const data: NormalizedBillboard = {
  rank: '1',
  title: 'Elogio a Instituição do Cinismo',
  artist: 'Boogarins',
  weeks_at_num_1: '3',
  peak_position: '1',
  weeks_on_chart: '3',
};

describe('Youtube service', () => {
  const mockedRequest = new httpUtil.Request() as jest.Mocked<httpUtil.Request>;

  it('should return the normalized youtube response from youtube service', async () => {
    mockedRequest.get.mockResolvedValue({
      data: youtubeSongResponse,
    } as httpUtil.Response);

    const youtube = new Youtube(mockedRequest);
    const response = await youtube.getYoutubeVideo(data);

    expect(response).toEqual(normalizedYoutubeResponse);
  });

  it('should get a youtube error from Youtube service when the request fail', async () => {
    mockedRequest.get.mockRejectedValue({
      data: {
        error: {
          message: 'API key not valid. Please pass a valid API key.',
          code: BAD_REQUEST,
        },
      },
    } as httpUtil.Response);

    const youtube = new Youtube(mockedRequest);

    await expect(youtube.getYoutubeVideo(data)).rejects.toThrow(
      'API key not valid. Please pass a valid API key.'
    );
  });

  it('should get a generic error from Youtube service when the request fail without information', async () => {
    mockedRequest.get.mockRejectedValue({
      data: null,
    } as httpUtil.Response);

    const youtube = new Youtube(mockedRequest);

    await expect(youtube.getYoutubeVideo(data)).rejects.toThrow(
      'Unexpeted Error'
    );
  });

  it('should inform that youtube service was not able to find the video from the song', async () => {
    try {
      mockedRequest.get.mockResolvedValue({
        data: [],
      } as httpUtil.Response);

      const youtube = new Youtube(mockedRequest);
      await youtube.getYoutubeVideo(data);
    } catch (data) {
      const err = data as IErrorGeneric;
      expect(err.message).toBe('Not able to find youtube video!');
      expect(err.code).toBe(NOT_FOUND);
    }
  });
});
