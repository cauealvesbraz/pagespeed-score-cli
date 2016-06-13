# pagespeed-score-cli [![Build Status](https://travis-ci.org/cauealves/pagespeed-score-cli.svg?branch=master)](https://travis-ci.org/cauealves/pagespeed-score-cli)

> Check the score of a website analyzed by PageSpeed Insights.

<br />

<p align="center">
  <img width="80%" src="./screenshot.gif?raw=true" />
</p>

## Install 

Ensure you've [Node.js](https://nodejs.org) version >=4 installed, then run the following:

```
$ [sudo] npm install --global pagespeed-score-cli
```

## Usage
```
  Usage
    $ pagespeed-score <url> <options>

  Options
    --mobile 				Analyze the URL for mobile devices.
    --filter-third-party 	Indicates if third party resources should be filtered out before PageSpeed analysis.

   Example: 
   	$ pagespeed-score https://google.com
```

## License

MIT © [Cauê Alves](http://cauealves.com)
