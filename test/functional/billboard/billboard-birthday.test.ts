import nock from 'nock';
import { OK, UNPROCESSABLE_ENTITY } from 'http-status';

import billboardTopHundredResponse from '@test/fixtures/billboard/billboardTopHundredResponse.json';
import normalizedBillboardBirthdayResponse from '@test/fixtures/billboard-birthday/normalizedBillboardBirthdayResponse.json';
import youtubeBillboardResponse from '@test/fixtures/billboard-birthday/youtubeBillboardResponse.json';

describe('billboard tests', () => {
  const baseUrl = '/api/billboard-birthday/top-hundred';

  it('should be able to get billboard top 100 with youtube link', async () => {
    const date = '2000-02-06';

    nock('https://billboard-api2.p.rapidapi.com:443', {
      encodedQueryParams: true,
    })
      .get('/hot-100')
      .query({ range: '1-1', date: '2000-02-06' })
      .reply(OK, billboardTopHundredResponse, [
        'X-Powered-By',
        'Express',
        'Content-Type',
        'application/json; charset=utf-8',
        'Content-Length',
        '129',
        'ETag',
        'W/"81-/JqAkCjjtrhbxcWJ6BV0JOxfE/s"',
        'Date',
        'Sat, 12 Mar 2022 21:45:56 GMT',
        'Connection',
        'close',
      ]);

    nock('https://www.googleapis.com:443', { encodedQueryParams: true })
      .get('/youtube/v3/search')
      .query({
        part: 'snippet',
        q: 'Savage%20Garden%20-%20I%20Knew%20I%20Loved%20You',
        type: 'video',
        key: process.env.GOOGLE_API_KEY || 'secret-cat',
      })
      .reply(OK, youtubeBillboardResponse, [
        'Content-Type',
        'application/json; charset=UTF-8',
        'Vary',
        'X-Origin',
        'Vary',
        'Referer',
        'Date',
        'Sun, 13 Mar 2022 14:52:55 GMT',
        'Server',
        'scaffolding on HTTPServer2',
        'Cache-Control',
        'private',
        'X-XSS-Protection',
        '0',
        'X-Frame-Options',
        'SAMEORIGIN',
        'X-Content-Type-Options',
        'nosniff',
        'Accept-Ranges',
        'none',
        'Vary',
        'Origin,Accept-Encoding',
        'Transfer-Encoding',
        'chunked',
        'Alt-Svc',
        'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"',
        'Connection',
        'close',
      ]);

    const response = await global.testRequest.get(`${baseUrl}?date=${date}`);

    expect(response.status).toBe(OK);
    expect(response.body).toEqual(normalizedBillboardBirthdayResponse);
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
