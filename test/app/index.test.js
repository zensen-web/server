const { execSync } = require('child_process');

describe('app', () => {
  before(() => {
    execSync('rm -rf test-app');
    execSync('npm run gen test-app');
    execApp('npm i');
  });

  after(() => {
    // execSync('rm -rf test-app');
  });

  it('generated app passes test', () => {
    execApp('npm run test');
  });

  it('generated app passes lint', () => {
    execApp('npm run lint');
  });

  context('building with babel', () => {
    let serverProcess;

    before(() => {
      execApp('npm run build');
    });

    after(() => serverProcess.kill());

    it('runs start prod succesfully', async () => {
      serverProcess = await spawnApp('npm', ['run', 'start:prod'], 'listening on port');
    });
  });

  context('building docker image', () => {
    let dockerProcess;

    before(async () => {
      execApp('docker-compose build');
      dockerProcess = await spawnApp('docker-compose', ['up']);
      // await new Promise((res) => setTimeout(res, 10000));
    });

    after(() => {
      dockerProcess.kill();
      execApp('docker-compose down');
    });

    it('exposes healthcheck on dev server', () => {
      expect(execApp('curl localhost:3000/healthcheck')).to.include('Healthy');
    });

    it('runs tests on server', () => {
      spawnApp('tail', ['-f', 'test.log'], 'listening on port');
    });

    it('exposes healthcheck on prod server', () => {
      expect(execApp('curl localhost:3002/healthcheck')).to.include('Healthy');
    });
  });
});
