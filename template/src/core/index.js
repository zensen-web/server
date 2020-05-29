import express from 'express';
import path from 'path';
import processDirectory from './process-directory';
import createSequelize from './process-models';

let zensenServer = {};

export const getZensenServer = () => zensenServer;

export const setupServer = async (config) => {
  zensenServer = { config };
  const port = process.env.NODE_ENV === 'test' ? 0 : config.port;
  zensenServer.app = express();
  zensenServer.sequelize = createSequelize(path.join(config.root, 'src', 'models'), config.sequelize);

  zensenServer.app.use('/', await processDirectory(path.join(config.root, 'src', 'controllers')));

  return new Promise((res) => {
    zensenServer.server = zensenServer.app.listen(port, () => {
      console.log(`${config.name} listening on port ${zensenServer.server.address().port}`);
      res(zensenServer);
    });
  });
};
