import startApp from '../index';

before(async () => {
  global.app = await startApp();
});

after(() => {
  global.app.close();
});
