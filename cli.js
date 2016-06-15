#! /usr/bin/env node

'use strict';

const dns = require('dns');
const chalk = require('chalk');
const isURL = require('is-url');
const ora = require('ora');
const argv = require('minimist')(process.argv.slice(2));
const logUpdate = require('log-update');
const logSymbols = require('log-symbols');
const updateNotifier = require('update-notifier');
const pagespeed = require('./pagespeed');

const pkg = require('./package.json');

updateNotifier({pkg}).notify();

let url = argv._;

if (argv.version && pkg.version !== false) {
  console.log(pkg.version);
  process.exit(0);
}

if (!url.length || argv.help === true) {
  console.log(chalk.cyan.bold('\n Usage: '));
  console.log('   pagespeed-score <url> <options>');
  console.log(chalk.green.bold('\n Options: '));
  console.log('   --mobile                  Analyze the URL for mobile devices.');
  console.log('   --filter-third-party      Indicates if third party resources should be filtered out before PageSpeed analysis\n');
  console.log(chalk.blue.bold(' Example: '));
  console.log('   pagespeed-score https://google.com\n');
  process.exit(0);
}

if (isURL(url) === false) {
  console.log(chalk.bold.red('\n The given URL was not valid.\n'));
  process.exit(1);
}

const spinner = ora();

dns.lookup('www.google.com', err => {
  if (err && err.code === 'ENOTFOUND') {
    spinner.stop();
    console.log(chalk.bold.red(' Please check you internet connection.\n'));
    process.exit(1);
  }
});

let strategy = (argv.mobile === true) ? 'mobile' : 'desktop';
let locale = ((typeof argv.locale === 'string')) ? argv.locale : 'en_US';
let filterThirdParty = (argv['filter-third-party'] === true) ? 'true' : 'false';

console.log();
spinner.start();
spinner.text = chalk.cyan.bold('Calculating, please wait...');

pagespeed(url, strategy, locale, filterThirdParty).then((response) => {
  if (response.error && response.error.code === 400) {
    spinner.stop();
    logUpdate(chalk.red.bold(
      'Could not resolve the URL: ' + chalk.blue.bold(url) + ' \nPlease, check the spelling or make sure is accessible.\n'
    ));
  }

  let isToShowUsabilityScore = (strategy === 'mobile');

  let speedScore = response.ruleGroups.SPEED.score;

  let message;

  if (speedScore < 21) {
    message = chalk.red.bold('  Status      :', logSymbols.error, '\n  Speed Score : ' + speedScore);
  } else if (speedScore < 80) {
    message = chalk.yellow.bold('  Status      :', logSymbols.warning, '\n  Speed Score : ' + speedScore);
  } else {
    message = chalk.green.bold('  Status      :', logSymbols.success, '\n  Speed Score : ' + speedScore);
  }

  if (isToShowUsabilityScore) {
    let usabilityScore = response.ruleGroups.USABILITY.score;

    if (usabilityScore < 21) {
      message += chalk.red.bold('\n  Usability   : ' + usabilityScore);
    } else if (usabilityScore < 80) {
      message += chalk.yellow.bold('\n  Usability   : ' + usabilityScore);
    } else {
      message += chalk.green.bold('\n  Usability   : ' + usabilityScore);
    }
  }

  spinner.stop();
  logUpdate(message + '\n');
});
