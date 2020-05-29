import { getZensenServer } from '../src/core';
import startApp from '../index';

before(async () => {
  await startApp();
  global.app = getZensenServer().server;
});

after(() => {
  global.app.close();
});
