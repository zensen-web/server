import { setupServer } from './src/core';
import serverConfig from './config/server';

const startServer = () => setupServer(serverConfig);

export default startServer;

if (require.main === module) {
  startServer();
}
