import { setupServer } from '../../../src';

const serverConfig = {
  name: 'models',
  port: 6000,
  root: __dirname,
  sequelize: 'sqlite::memory:',
};

const startServer = () => setupServer(serverConfig);

export default startServer;
