import path from 'path';
import { readdirSync, existsSync } from 'fs';

import Sequelize from 'sequelize';

const processDir = (directory, sequelize) => {
  if (existsSync(directory)) {
    // parse subdir with directory name as prefix
    const children = readdirSync(directory, { withFileTypes: true });
    const files = children.filter((c) => c.isFile());
    const folders = children.filter((c) => c.isDirectory());

    (folders.map(async (f) => processDir(path.join(directory, f.name), sequelize)));

    (files.forEach(async (f) => {
      if (!f.name.endsWith('.js')) return;
      /* eslint-disable-next-line */
      let Model = require(path.join(directory, f.name));
      Model = Model.default ? Model.default : Model;
      Model.init(Model.columns, { ...Model.sequelizeOptions, sequelize });
    }));
  }
};

const createSequelize = async (directory, options) => {
  if (!options) return null;
  const sequelize = new Sequelize(options);

  processDir(directory, sequelize);

  return sequelize;
};

export default createSequelize;
