import express from 'express';
import path from 'path';
import { readdirSync, existsSync } from 'fs';

const buildController = (config) => [(req, res) => {
  const result = config.handler();
  if (!result) return;

  res.json(config.formatter ? config.formatter(result) : result);
}];

const processDirectory = async (directory) => {
  const router = new express.Router();

  if (existsSync(directory)) {
    const children = readdirSync(directory, { withFileTypes: true });
    const files = children.filter((c) => c.isFile());
    const folders = children.filter((c) => c.isDirectory());

    await Promise.all(folders.map(async (f) => router.use(`/${f.name}`, await processDirectory(path.join(directory, f.name)))));

    await Promise.all(files.map(async (f) => {
      const method = path.parse(f.name).name;

      /* eslint-disable-next-line */
      let controllerConfig = require(path.join(directory, f.name));
      controllerConfig = controllerConfig.default ? controllerConfig.default : controllerConfig;

      router[method]('/', ...buildController(controllerConfig));
    }));
  }


  return router;
};

export default processDirectory;
