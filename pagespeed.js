#! /usr/bin/env node

'use strict';

const fetch = require('node-fetch');

const API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?';

module.exports = function (url, strategy, locale, filterThirdParty) {
  const query = [
    'url=' + url,
    'strategy=' + strategy,
    'locale=' + locale,
    'filter_third_party_resources=' + filterThirdParty
  ].join('&');

  return fetch(API_URL + query).then(response => response.json());
};