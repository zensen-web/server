const setupServer = require('@zensen/server-core');

module.exports = () => setupServer({
  name: '{{name}}',
  port: 3000,
  root: __dirname,
});

if (require.main === module) {
  module.exports();
}
