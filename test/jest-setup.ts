import 'dotenv/config';

import Application from '@src/application/Application';
import supertest from 'supertest';

beforeAll(async () => {
  const app = new Application();
  await app.init();
  global.testRequest = supertest(app.server.app);
});
