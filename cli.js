#! /usr/bin/env node

'use strict';

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
  console.log(`
    ${chalk.cyan.bold('Usage:')}
      pagespeed-score <url> <options>

    ${chalk.green.bold('Options:')}
      --mobile                  Analyze the URL for mobile devices.
      --filter-third-party      Indicates if third party resources should be filtered out before PageSpeed analysis

    ${chalk.blue.bold('Example:')}
      pagespeed-score https://google.com
  `);
  process.exit(0);
}

if (isURL(url) === false) {
  console.log(`${chalk.bold.red('The given URL was not valid.')}`);
  process.exit(1);
}

const spinner = ora();

dns.lookup('www.google.com', err => {
  if (err && err.code === 'ENOTFOUND') {
    spinner.stop();
    console.log(chalk.bold.red('Please check you internet connection.'));
    process.exit(1);
  }
});

let strategy = (argv.mobile === true) ? 'mobile' : 'desktop';
let locale = ((typeof argv.locale === 'string')) ? argv.locale : 'en_US';
let filterThirdParty = (argv['filter-third-party'] === true) ? 'true' : 'false';

spinner.start();
spinner.text = chalk.cyan.bold('Calculating, please wait...');

pagespeed(url, strategy, locale, filterThirdParty).then(response => {
  if (response.error && response.error.code === 400) {
    spinner.stop();
    logUpdate(
      chalk.red.bold(`Could not resolve the URL: ${chalk.blue.bold(url)}
Please, check the spelling or make sure is accessible.'`)
    );
  }

  let isToShowUsabilityScore = (strategy === 'mobile');

  let speedScore = response.ruleGroups.SPEED.score;

  let message;

  if (speedScore < 21) {
    message = chalk.red.bold(`${logSymbols.error} Score: ${speedScore}`);
  } else if (speedScore < 80) {
    message = chalk.yellow.bold(`${logSymbols.warning} Score: ${speedScore}`);
  } else {
    message = chalk.green.bold(`${logSymbols.success} Score: ${speedScore}`);
  }

  if (isToShowUsabilityScore) {
    let usabilityScore = response.ruleGroups.USABILITY.score;

    if (usabilityScore < 21) {
      message += chalk.red.bold(`
${logSymbols.success} Usability: ${usabilityScore}`
      );
    } else if (usabilityScore < 80) {
      message += chalk.yellow.bold(`
${logSymbols.success} Usability: ${usabilityScore}`);
    } else {
      message += chalk.green.bold(`
${logSymbols.success} Usability: ${usabilityScore}`);
    }
  }

  spinner.stop();
  logUpdate(message);
});
