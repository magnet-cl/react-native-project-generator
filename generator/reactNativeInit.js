const { OK } = require('./config');
const colors = require('colors');
const dedent = require('dedent');
const inquirer = require('inquirer');
const semver = require('semver');
const sh = require('shelljs');
const path = require('path');
const childProcess = require('child_process');

const questions = [
  {
    type: 'input',
    name: 'appName',
    message: 'What is the new project name? (Camel case, no spaces)',
    default: 'AwesomeProject',
    validate: value =>
      `${value[0].toUpperCase()}${value.slice(1)}` ===
      value.split(' ').join(''),
  },
  {
    type: 'confirm',
    name: 'proceed',
    message: ({ appName }) => dedent`
      Next step will start project generator for ${appName}.
      Do you want to continue? ("No" will exit generator ok)
      `,
    default: true,
  },
];

module.exports = async () => {
  sh.echo(
    dedent`\n
    REACT NATIVE INIT
    =================
    \n
    `.white,
  );

  const { appName, proceed } = await inquirer.prompt(questions);
  if (!proceed) {
    sh.exit(0);
  }

  sh.echo(
    `Running react-native init ${appName}, this may take a few minutes`.green,
  );

  try {
    childProcess.execFileSync('react-native', ['init', appName], {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error(error);
    sh.echo(
      `react-native init ${appName} exited with error, check them above.`.red,
    );
    sh.exit(1);
  }
  sh.echo(`${OK} react-native init ${appName} ran successfully.`.green);

  return appName;
};
