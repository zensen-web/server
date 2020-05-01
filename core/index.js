const express = require('express');
const path = require('path');
const { processDirectory } = require('./src/process-directory.js');

module.exports = async (config) => {
  const port = process.env.NODE_ENV === 'test' ? 0 : config.port;
  const app = express();

  app.use('/', await processDirectory(path.join(config.root, 'src', 'controllers')));

  return new Promise((res) => {
    const server = app.listen(port, () => {
      console.log(`${config.name} listening on port ${server.address().port}`);
      res(server);
    });
  });
};
