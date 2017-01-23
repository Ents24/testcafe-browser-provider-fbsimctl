# testcafe-browser-provider-fbsimctl
[![Build Status](https://travis-ci.org/dig412/testcafe-browser-provider-fbsimctl.svg)](https://travis-ci.org/dig412/testcafe-browser-provider-fbsimctl)

This is the **fbsimctl** browser provider plugin for [TestCafe](http://devexpress.github.io/testcafe).

## Install

```
npm install testcafe-browser-provider-fbsimctl
```

## Usage


You can determine the available browser aliases by running
```
testcafe -b fbsimctl
```

When you run tests from the command line, use the alias when specifying browsers:

```
testcafe fbsimctl:browser1 'path/to/test/file.js'
```


When you use API, pass the alias to the `browsers()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('fbsimctl:browser1')
    .run();
```

## Author
 (https://ents24.com)
