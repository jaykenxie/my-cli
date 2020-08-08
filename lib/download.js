const { promisify } = require('util');

exports.clone = async (repo, desc) => {
  const dowonlad = promisify(require('download-git-repo'));
  const ora = require('ora');
  const process = ora(`下载...${repo}`);
  process.start();
  await dowonlad(repo, desc);
  process.succeed();
};
