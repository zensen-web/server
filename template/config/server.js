import path from 'path';
import dbConfig from './database';

export default {
  name: '{{name}}',
  port: 3000,
  root: path.join(__dirname, '..'),
  sequelize: dbConfig[process.env.NODE_ENV || 'development'],
};
