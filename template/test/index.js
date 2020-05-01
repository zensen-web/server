const startApp = require('../index.js');

before(async () => {
  global.app = await startApp();
});

after(() => {
  global.app.close();
});
