module.exports = (plop) => {
  plop.setGenerator('app', {
    description: 'application',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'controller name please',
    }],
    actions: [{
      type: 'addMany',
      destination: './{{name}}',
      base: 'template',
      templateFiles: 'template/**/*.*',
      globOptions: { ignore: 'template/node_modules/**/*.*' },
    }],
  });
};
