const { promisify } = require('util');
const figlet = promisify(require('figlet'));
const clear = require('clear');
const chalk = require('chalk');
const { clone } = require('./download');

// 用chalk包自定义log函数，使最终打印在命令行上的提示文字为蓝色
const log = (content) => console.log(chalk.blue(content));

/**
 * 使用node子进程去执行命令
 * @param  {...any} args 类似命令行指令
 */
const spawn = (...args) => {
  /**
   * spawn - child_process.spawn 使用指定的命令行参数创建新进程。
   * spawn 会返回一个带有stdout和stderr流的对象。你可以通过stdout流来读取子进程返回给Node.js的数据。s
   * tdout拥有’data’,’end’以及一般流所具有的事件。当你想要子进程返回大量数据给Node时，比如说图像处理，读取二进制数据等等，你最好使用spawn方法。
   */
  const { spawn } = require('child_process');
  return new Promise((resolve) => {
    // 创建并执行spawn
    const childProcess = spawn(...args);
    // 将子进程的标准输出接到主进程，以便能在命令行中输出信息，因为你的终端命令是运行在主进程中的，所以子进程的输出信息是看不到的
    childProcess.stdout.pipe(process.stdout);
    // 将子进程的错误流接到主进程
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('close', resolve);
  });
};

/**
 * 处理命令逻辑，如在命令行输入了shanx init demo 回车就会调用这里，name就等于demo
 * @param {*} name
 */
module.exports = async (name) => {
  clear(); // 清空屏幕信息
  const data = await figlet('Hello shanx'); // 生成大号欢迎信息
  log(data); // 换个颜色打印

  // clone
  log('🚀创建项目：' + name);
  // 克隆存放在github中的仓库，并把项目名称传入
  await clone('github:jianjunx/my-cli', name);
  log('🔨开始安装依赖');
  // 这一步是执行以来安装，第一个参数代表指令名，第二个是参数例如：npm i -g npm 后面三个参数都要放到这个数组中，第三个对象中的cwd代表命令进到哪个目录中执行
  await spawn('npm', ['i'], { cwd: `./${name}` });
  // 安装完成 打印信息
  log(`
  ==========================
  👌安装完成
  cd ${name}
  npm run serve
  ==========================
  `);
};
