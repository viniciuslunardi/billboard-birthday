import { Billboard } from '@src/services/billboard/Billboard';
import * as httpUtil from '@src/util/Request';

import billboardTopHundredResponse from '@test/fixtures/billboard/billboardTopHundredResponse.json';
import normalizedBillboardResponse from '@test/fixtures/billboard/normalizedBillboardResponse.json';

jest.mock('@src/util/Request');

describe('Billboard service', () => {
  const mockedRequest = new httpUtil.Request() as jest.Mocked<httpUtil.Request>;

  it('should return the normalized billboard response from billboard service', async () => {
    const date = '2000-02-06';

    mockedRequest.get.mockResolvedValue({
      data: billboardTopHundredResponse,
    } as httpUtil.Response);

    const billboard = new Billboard(mockedRequest);
    const response = await billboard.getTopHundred(date);

    expect(response).toEqual(normalizedBillboardResponse);
  });

  it('should get an billboard service error when the request has problems in it', async () => {
    const date = '2000-02-06';

    mockedRequest.get.mockResolvedValue({
      data: { ERROR: 'Please Check Your Request' },
    } as httpUtil.Response);

    const billboard = new Billboard(mockedRequest);

    await expect(billboard.getTopHundred(date)).rejects.toThrow(
      'Billboard service error'
    );
  });

  it('should not be able to get the chart from Billboard service with an invalid date', async () => {
    const date = '06/02/2000';

    const billboard = new Billboard(mockedRequest);

    await expect(billboard.getTopHundred(date)).rejects.toThrow(
      'Invalid date format. Should be YYYY-MM-D'
    );
  });

  it('should not be able to get the chart from Billboard service with an invalid date with wrong chars', async () => {
    const date = '9999-89-98';

    const billboard = new Billboard(mockedRequest);

    await expect(billboard.getTopHundred(date)).rejects.toThrow(
      'Invalid date format. Should be YYYY-MM-D'
    );
  });

  it('should get an generic error from Billboard service when the request fail', async () => {
    const date = '2000-02-06';

    mockedRequest.get.mockRejectedValue({
      data: null,
    } as httpUtil.Response);

    const billboard = new Billboard(mockedRequest);

    await expect(billboard.getTopHundred(date)).rejects.toThrow(
      'Unexpeted Error'
    );
  });

  it('should inform that the Billboard service was not able to get the all the information when the response is incomplete', async () => {
    const date = '2000-02-06';

    const missingDataResponse = {
      ...billboardTopHundredResponse,
      content: null,
    };

    mockedRequest.get.mockResolvedValue({
      data: missingDataResponse,
    } as httpUtil.Response);

    const billboard = new Billboard(mockedRequest);

    await expect(billboard.getTopHundred(date)).rejects.toThrow(
     'Not able to find the billboard top 1 for that day!'
    );
  });
});
