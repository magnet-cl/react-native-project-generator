const colors = require('colors');
const dedent = require('dedent');
const path = require('path');
const sh = require('shelljs');
const { version } = require('../package.json');

const dependencies = require('./dependencies');
const reactNativeInit = require('./reactNativeInit');
const packages = require('./packages');

module.exports = async () => {
  sh.echo(
    dedent`\n
    React Native Project Generator (v${version})
    ------------------------------
    `.white,
  );
  await dependencies();
  const appName = await reactNativeInit();
  console.log(appName);
  packages(appName);
};
