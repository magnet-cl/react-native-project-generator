const { MIN_NODE_VERSION, OK } = require('./config');
const colors = require('colors');
const dedent = require('dedent');
const semver = require('semver');
const sh = require('shelljs');

module.exports = () => {
  sh.echo(
    dedent`\n
    CHECKING DEPENCENCIES
    =====================
    \n
    `.white,
  );

  /* Check brew */

  if (!sh.which('brew')) {
    sh.echo(
      'Brew is not installed. Follow installation instruction at https://brew.sh/'
        .red,
    );
    sh.exit(1);
  } else {
    sh.echo(`${OK} Brew installed`.green);
  }

  /* Check node */

  if (!sh.which('node')) {
    sh.echo('Node is not installed. How are you even running this?'.red);
    sh.exit(1);
  } else {
    const nodeVersion = sh
      .exec('node --version', { silent: true })
      .stdout.trim();
    if (semver.lt(nodeVersion, MIN_NODE_VERSION)) {
      sh.echo(
        `You're running node ${nodeVersion}, please upgrade to at least ${MIN_NODE_VERSION}.`
          .red,
      );
      sh.exit(1);
    } else {
      sh.echo(`${OK} Node installed`.green);
    }
  }

  if (!sh.which('yarn')) {
    sh.echo('Installing yarn'.yellow);
    if (sh.exec('brew install yarn --without-node').code) {
      sh.exit(1);
    }
  }

  sh.echo(`${OK} Yarn installed`.green);

  /* Check watchman */

  if (!sh.which('watchman')) {
    sh.echo('Installing watchman'.yellow);
    if (sh.exec('brew install watchman').code) {
      sh.exit(1);
    }
  }

  sh.echo(`${OK} Watchman installed`.green);

  /* Check react-native-cli */

  if (!sh.which('react-native')) {
    sh.echo('Installing react-native-cli'.yellow);
    if (sh.exec('yarn global add react-native-cli').code) {
      sh.exit(1);
    }
  }

  sh.echo(`${OK} react-native-cli installed`.green);

  /* Check android */
  let hasAndroidVariable = Boolean(
    sh.exec('echo $ANDROID_HOME', { silent: true }).stdout.trim().length,
  );

  sh.echo(
    dedent`${
      hasAndroidVariable
        ? 'It seems like you have set up android already, just in case,'
        : 'Please'
    } go to https://facebook.github.io/react-native/docs/getting-started.html and follow Java Development Kit steps.`
      .yellow,
  );
};
