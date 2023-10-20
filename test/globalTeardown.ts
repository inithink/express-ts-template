import util from 'util';

import { exec as execCallback } from 'child_process';

const exec = util.promisify(execCallback);

module.exports = async function () {
  console.log('docker-compose down');
  await exec('docker-compose down');
};
