#! /usr/bin/env node

'use strict';

const dns = require('dns');
const chalk = require('chalk');
const isURL = require('is-url');
const ora = require('ora');
const argv = require('minimist')(process.argv.slice(2));
const logUpdate = require('log-update');
const logSymbols = require('log-symbols');
const pagespeed = require('./pagespeed');

let url = argv._;

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

const regex = /\/\/([^\/,\s]+\.[^\/,\s]+?)(?=\/|,|\s|$|\?|#)/g;
const input = process.argv[2];
const extract = regex.exec(input);
const urlPart = extract[1];

const spinner = ora();

dns.lookup(urlPart, err => {
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

pagespeed(url, strategy, locale, filterThirdParty).then(response => {
  let score = response.ruleGroups.SPEED.score;

  let message;

  if (score < 50) {
    message = chalk.red.bold('  Status      :', logSymbols.error, '\n  Total Score : ' + score);
  } else if (score < 80) {
    message = chalk.yellow.bold('  Status      :', logSymbols.warning, '\n  Total Score : ' + score);
  } else {
    message = chalk.green.bold('  Status      :', logSymbols.success, '\n  Total Score : ' + score);
  }

  spinner.stop();
  logUpdate(message);
  console.log();
});
