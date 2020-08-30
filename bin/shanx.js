#!/usr/bin/env node
const program = require('commander');
const { version } = require('../package.json');
const init = require('../lib/init');

// 设置版本信息
program.version(version);

program
  .command('init <name>') // 定义命令
  .description('init project') // 命令描述信息
  .action((name) => init(name)); // 处理指令 回调函数中的name 就是命令第三个参数的值 如：shanx init demo 那么name就等于demo

program.parse(process.argv); // 通过program.parse(arguments)方法处理参数，没有被使用的选项会存放在program.args数组中。
