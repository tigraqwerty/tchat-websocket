import path from 'path';
import { writeFile, existsSync, readFileSync } from 'fs';

const __dirname = path.resolve();

export const getBackupPath = (filename) =>
  `${__dirname}/src/backup/${filename}`;

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
