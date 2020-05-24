import setupServer from '@zensen/server-core';

const startServer = () => setupServer({
  name: '{{name}}',
  port: 3000,
  root: __dirname,
});

export default startServer;

if (require.main === module) {
  startServer();
}
