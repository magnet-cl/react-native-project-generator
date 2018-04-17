const { OK, PACKAGES } = require('./config');
const childProcess = require('child_process');
const dedent = require('dedent');
const path = require('path');
const replace = require('replace-in-file');
const sh = require('shelljs');

module.exports = appName => {
  sh.echo(
    dedent`\n
    CUSTOM DEPENDENCIES
    ===================
    \n
    `.white,
  );

  const projectDirectory = path.join(sh.pwd().toString(), appName);
  const sourcesDirectory = path.join(__dirname, '../sources/');

  const srcDirectory = path.join(sourcesDirectory, 'src/*');
  const srcRootDirectory = path.join(sourcesDirectory, 'rootfiles/*');
  const srcDotFilesDirectory = path.join(sourcesDirectory, 'dotfiles/');

  const destinationSrc = path.join(projectDirectory, '/src/');
  const destinationIndexFile = path.join(projectDirectory, 'index.js');

  sh.cd(projectDirectory);
  sh.mkdir('src');

  const packagesString = PACKAGES.map(
    pkg => `${pkg.name}${pkg.version ? `@${pkg.version}` : ''}`,
  ).join(' ');

  sh.exec(`yarn add ${packagesString}`);

  sh.echo(`${OK} custom dependencies succesfully installed`.green);

  sh.cp(srcRootDirectory, projectDirectory);
  sh.cp('-R', srcDirectory, destinationSrc);

  sh.ls(`${srcDotFilesDirectory}/*`).forEach(function(file) {
    sh.cp(file, path.join(projectDirectory, `./.${path.basename(file)}`));
  });

  sh.exec(dedent`
    echo "
    # Sentry
    sentry.properties" >> ${path.join(projectDirectory, `./.gitignore`)}
  `);

  const changes = replace.sync({
    files: destinationIndexFile,
    from: `import App from './App';`,
    to: `import App from './src/App';`,
  });

  sh.echo(`${OK} custom sources succesfully copied`.green);

  try {
    childProcess.execFileSync('react-native', ['link'], {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error(error);
    sh.echo(`react-native link exited with error, check them above.`.red);
    sh.exit(1);
  }

  sh.echo(`${OK} native packages linked`.green);

  sh.echo(`Further action required`.bgYellow.black);

  sh.echo(
    dedent`
    • Backup (ios|android)/sentry.properties files
    • Copy Sentry config string from App.js to .env files`.yellow,
  );
};
