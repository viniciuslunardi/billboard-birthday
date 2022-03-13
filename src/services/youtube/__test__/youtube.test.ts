import { Youtube } from '@src/services/youtube/Youtube';
import * as httpUtil from '@src/util/request';

import youtubeSongResponse from '@test/fixtures/youtube/youtubeSongResponse.json';
import normalizedYoutubeResponse from '@test/fixtures/youtube/normalizedYoutubeResponse.json';

jest.mock('@src/util/request');

describe('Youtube service', () => {
  const mockedRequest = new httpUtil.Request() as jest.Mocked<httpUtil.Request>;

  it('should return the normalized youtube response from youtube service', async () => {
    const song = 'Boogarins - Elogio a Instituição do Cinismo';

    mockedRequest.get.mockResolvedValue({
      data: youtubeSongResponse,
    } as httpUtil.Response);

    const billboard = new Youtube(mockedRequest);
    const response = await billboard.getYoutubeVideo(song);

    expect(response).toEqual(normalizedYoutubeResponse);
  });

  it('should get a generic error from Youtube service when the request fail', async () => {
    // const date = '2000-02-06';
    // mockedRequest.get.mockResolvedValue({
    //   data: { ERROR: 'Please Check Your Request' },
    // } as httpUtil.Response);
    // const billboard = new Billboard(mockedRequest);
    // await expect(billboard.getTopHundred(date)).rejects.toThrow(
    //   'Billboard service error'
    // );
  });
});
