module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME || 'root',
    password: process.env.DEV_DB_PASSWORD || null,
    database: process.env.DEV_DB_NAME || '{{name}}_development',
    host: process.env.DEV_DB_HOST || 'db',
    dialect: process.env.DEV_DB_DIALECT || 'mysql',
  },
  test: {
    username: process.env.TEST_DB_USERNAME || 'root',
    password: process.env.TEST_DB_PASSWORD || null,
    database: process.env.TEST_DB_NAME || '{{name}}_test',
    host: process.env.TEST_DB_HOST || 'db',
    dialect: process.env.TEST_DB_DIALECT || 'mysql',
  },
  production: {
    username: process.env.PRODUCTION_DB_USERNAME || 'root',
    password: process.env.PRODUCTION_DB_PASSWORD || null,
    database: process.env.PRODUCTION_DB_NAME || '{{name}}_production',
    host: process.env.PRODUCTION_DB_HOST || 'db',
    dialect: process.env.PRODUCTION_DB_DIALECT || 'mysql',
  },
};
