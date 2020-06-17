import { setupServer } from '../../../src';

const serverConfig = {
  name: 'minimal',
  port: 6000,
  root: __dirname,
};

const startServer = () => setupServer(serverConfig);

export default startServer;
