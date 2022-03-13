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

  it('should get a generic error from Billboard service when the request fail', async () => {
    const date = '2000-02-06';

    mockedRequest.get.mockResolvedValue({
      data: { ERROR: 'Please Check Your Request' },
    } as httpUtil.Response);

    const billboard = new Billboard(mockedRequest);

    await expect(billboard.getTopHundred(date)).rejects.toThrow(
      'Billboard service error'
    );
  });
});
