const { PACKAGES } = require('./config');
const dedent = require('dedent');
const path = require('path');
const sh = require('shelljs');

module.exports = appName => {
  sh.echo(
    dedent`\n
    CUSTOM DEPENCENCIES
    =====================
    \n
    `.white,
  );

  const projectFolder = path.join(sh.pwd().toString(), appName);

  sh.cd(projectFolder);

  const packagesString = PACKAGES.map(
    pkg => `${pkg.name}${pkg.version ? `@${pkg.version}` : ''}`,
  ).join(' ');
  sh.echo(`${packagesString}`);
  sh.exec(`yarn add ${packagesString}`);
};
