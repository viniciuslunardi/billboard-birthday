import nock from 'nock';
import { OK, UNPROCESSABLE_ENTITY } from 'http-status';

import billboardTopHundredResponse from '@test/fixtures/billboard/billboardTopHundredResponse.json';
import normalizedBillboardResponse from '@test/fixtures/billboard/normalizedBillboardResponse.json';

describe('billboard tests', () => {
  const baseUrl = '/api/billboard-birthday/top-hundred';

  it('should be able to get billboard top 100', async () => {
    const date = '2000-02-06';

    nock.recorder.rec();

    nock('https://billboard-api2.p.rapidapi.com:443', {
      encodedQueryParams: true,
    })
      .get('/hot-100')
      .query({ range: '1-1', date: '2000-02-06' })
      .reply(OK, billboardTopHundredResponse, []);

    const response = await global.testRequest.get(`${baseUrl}?date=${date}`);
    expect(response.status).toBe(OK);
    expect(response.body).toEqual(normalizedBillboardResponse);
  });

  it('should not be able to get billboard top 100 without a date', async () => {
    const response = await global.testRequest.get(`${baseUrl}`);
    expect(response.status).toBe(UNPROCESSABLE_ENTITY);
    expect(response.text).toBe(
      'You must enter a date to check the top 1 chart of that day'
    );
  });

  it('should not be able to get billboard top 100 with invalid date format', async () => {
    const date = '2000-02-45';

    const response = await global.testRequest.get(`${baseUrl}?date=${date}`);
    expect(response.status).toBe(UNPROCESSABLE_ENTITY);
    expect(response.text).toBe('Invalid date format. Should be YYYY-MM-DD');
  });
});
