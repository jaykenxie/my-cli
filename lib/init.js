const { promisify } = require('util');
const figlet = promisify(require('figlet'));
const clear = require('clear');
const chalk = require('chalk');
const { clone } = require('./download');

const log = (content) => console.log(chalk.blue(content));

const spawn = (...args) => {
  const { spawn } = require('child_process');
  return new Promise((resolve) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('close', resolve);
  });
};

module.exports = async (name) => {
  clear();
  const data = await figlet('Hello shanx');
  log(data);

  // clone
  log('🚀创建项目：' + name);
  await clone('github:jaykenxie/shanx-sys-main', name);
  log('🔨开始安装依赖');
  await spawn('npm', ['i'], { cwd: `./${name}` });
  log(`
  ==========================
  👌安装完成
  cd ${name}
  npm run serve
  ==========================
  `);
};
