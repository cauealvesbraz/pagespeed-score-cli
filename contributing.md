## Contributor guide

Hi there,
For contributing fork this repository and clone it in your workstation.

For cloning run :-

``` sh

$ git clone https://github.com/<your-username>/pagespeed-score-cli.git

```

One cloned completely. Change your current working directory to project directory.

After that you need to install packages used for this project.

In your terminal:-

``` sh
$ npm install
```

This will install all packages required.

Now in your terminal you can run this to get moving.
``` sh
$ pagespeed-score 
```
Now follow general github contributing guidelines like make a new branch and do your all work there .

Before submitting pull request 
- make sure your dont have any conflicts with `upstream/master` branch.
  If you have please resolve them . :)
- Run `npm test` it will execute tests and see if all tests passes or not.
    1. If passed feel free to submit a PR.
    2. If not fix those errors/failed test cases.
       
       > "Window user might see errors like `Can't Spawn undefined ENOENT`". Its error with windows file system
          and you should not worry about it and submit a PR.
          If there is any other error other than these then fix them :).


## Contributors
  - [cauealves](https://github.com/cauealves)
  - [Rishi Giri](https://github.com/CodeDotJS)
  - [Tarun Garg](https://tarungarg546.github.io)

## Awaiting your PR