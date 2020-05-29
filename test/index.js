const { spawn, execSync } = require('child_process');
const { expect } = require('chai');

global.expect = expect;
global.execApp = (command) => {
  const result = execSync(command, { cwd: `${process.cwd()}/test-app` }).toString();
  console.log(result);
  return result;
};

global.spawnApp = (command, args, outputString) => {
  let outputTimeoutId = null;

  const check = outputString ? (output) => output.includes(outputString) : () => {
  };


  const serverProcess = spawn(command, args, { cwd: `${process.cwd()}/test-app` });

  return new Promise((res, rej) => {
    let done = false;
    let output = '';

    const timeoutId = setTimeout(() => {
      rej(serverProcess);
    }, 300000);

    serverProcess.stdout.on('data', (data) => {
      console.log(data.toString());

      if (outputString) {
        output += data.toString();
        if (!done && output.includes(outputString)) {
          done = true;
          clearTimeout(timeoutId);
          res(serverProcess);
        }
      } else {
        if (outputTimeoutId !== null) clearTimeout(outputTimeoutId);
        outputTimeoutId = setTimeout(() => {
          res(serverProcess);
        }, 5000);
      }
    });
  });
};
