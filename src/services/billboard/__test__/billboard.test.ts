import { Billboard } from '@src/services/billboard/Billboard';
import * as httpUtil from '@src/util/request';

import billboardTopHundredResponse from '@test/fixtures/billboard/billboardTopHundredResponse.json';
import normalizedBillboardResponse from '@test/fixtures/billboard/normalizedBillboardResponse.json';

jest.mock('@src/util/request');

describe('Billboard service', () => {
  const mockedRequestClass = httpUtil.Request as jest.Mocked<
    typeof httpUtil.Request
  >;

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
});
