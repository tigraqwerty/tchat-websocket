import path from 'path';
import { writeFile, existsSync, readFileSync } from 'fs';

import { resourcePath } from '../constants/path-name.constant.js';

const __dirname = path.resolve();

export const getBackupPath = (filename) =>
  `${__dirname}/${resourcePath.serverPath}/${resourcePath.backupPath}/${filename}`;

export const loadFile = (filename) =>
  existsSync(getBackupPath(filename)) && readFileSync(getBackupPath(filename));

export const saveFile = (filename, content) => {
  writeFile(getBackupPath(filename), JSON.stringify(content), (err) => {
    if (err) {
      console.log(err);
    }
    process.exit();
  });
};
