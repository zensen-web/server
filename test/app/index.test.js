const { spawn, execSync } = require('child_process');

describe('app', () => {
  before(() => {
    execSync('npm run gen test-app');
    execSync('npm link ../core', { cwd: `${process.cwd()}/test-app` });
    execSync('npm i', { cwd: `${process.cwd()}/test-app` });
    execSync('npm link ../core', { cwd: `${process.cwd()}/test-app` });
  });

  after(() => {
    execSync('rm -rf test-app');
  });

  it('generated app passes test', () => {
    execSync('npm run test', { cwd: `${process.cwd()}/test-app` });
  });

  it('generated app passes lint', () => {
    execSync('npm run lint', { cwd: `${process.cwd()}/test-app` });
  });

  context('building with babel', () => {
    let serverProcess;
    let output;

    before(() => {
      output = '';
      execSync('npm run build', { cwd: `${process.cwd()}/test-app` });
      serverProcess = spawn('npm', ['run', 'start:prod'], { cwd: `${process.cwd()}/test-app` });
    });

    after(() => serverProcess.kill());

    it('runs start prod succesfully', () => new Promise((res) => {
      let done = false;
      serverProcess.stdout.on('data', (data) => {
        console.log(data.toString());
        output += data.toString();
        if (!done && output.includes('listening on port')) {
          done = true;
          res();
        }
      });
    }));
  });

  context.skip('building docker image', () => {
    let output = '';
    let dockerProcess;

    before(() => {
      execSync('docker build -t test-image .', { cwd: `${process.cwd()}/test-app` });
      dockerProcess = spawn('docker run --rm test-image', { cwd: `${process.cwd()}/test-app` });
      return new Promise((res) => {
        let done = false;
        dockerProcess.stdout.on('data', (data) => {
          console.log(data.toString());
          output += data.toString();
          if (!done && output.includes('listening on port')) {
            done = true;
            res();
          }
        });
      });
    });

    after(() => {
      dockerProcess.kill();
    });

    it('exposes healthcheck', () => {
      const response = execSync('curl localhost:3000/healthcheck', { cwd: `${process.cwd()}/test-app` });
      expect(response).to.equal('');
    });
  });
});
