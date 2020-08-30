const { promisify } = require('util');

/**
 * 从GitHub仓库下载代码到本地
 * @param {*} repo GitHub仓库名，规则请参考download-git-repo文档
 * @param {*} desc 本地存放的目录
 */
exports.clone = async (repo, desc) => {
  const dowonlad = promisify(require('download-git-repo'));
  const ora = require('ora');
  const process = ora(`下载...${repo}`);
  // 在命令行显示下载中 并加上旋转动画
  process.start();
  // 开始下载GitHub项目中的代码到本地
  await dowonlad(repo, desc);
  // 下载完成结束旋转动画
  process.succeed();
};
