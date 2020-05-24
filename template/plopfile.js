module.exports = (plop) => {
  plop.setGenerator('model', {
    description: 'sequelize database model',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'model name please',
    },

    {
      type: 'input',
      name: 'fields',
      message: 'Please enter all model properties in this format\nfileName1:fieldType1,fieldName2:fieldType2...',
    },

    {
      type: 'input',
      name: 'associations',
      message: 'Please enter all model properties in this format\nModelName1:associationType1,ModelName2:associationType2...',
    }],
    actions: [{
      type: 'addMany',
      destination: './{{name}}',
      base: 'template',
      templateFiles: 'template/**/*',
      globOptions: { ignore: 'template/node_modules/**/*' },
    }],
  });
};
