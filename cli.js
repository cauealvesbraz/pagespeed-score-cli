#! /usr/bin/env node

'use strict';

const pagespeed   = require('./pagespeed');
const chalk       = require('chalk');
const meow        = require('meow');
const ora         = require('ora');
const argv        = require('minimist')(process.argv.slice(2));
const logUpdate   = require('log-update');
const logSymbols  = require('log-symbols');

const cli = meow(`
    Usage
      $ pagespeed-score <url> <options>
`);

let url = argv._;
let strategy = (argv.mobile === true) ? 'mobile' : 'desktop';
let locale = ((typeof argv.locale === 'string')) ? argv.locale : 'en_US';
let filterThirdParty = (argv['filter-third-party'] === true) ? 'true' : 'false';

const spinner = ora({
  color: 'grey',
  text: chalk.grey.dim('Calculating...')
});

spinner.start();

pagespeed(url, strategy, locale, filterThirdParty).then(response => {
  let score = response.ruleGroups.SPEED.score;
  
  let message;

  if (score < 50) {
    message = chalk.red.bold(logSymbols.error + ' Score: ' + score);
  } else if (score < 80) {
    message = chalk.yellow.bold(logSymbols.warning + ' Score: ' + score);
  } else {
    message = chalk.green.bold(logSymbols.success + ' Score: ' + score);
  };

  spinner.stop();

  logUpdate(message);
});