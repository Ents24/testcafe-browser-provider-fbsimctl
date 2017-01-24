# testcafe-browser-provider-fbsimctl
[![Build Status](https://travis-ci.org/dig412/testcafe-browser-provider-fbsimctl.svg)](https://travis-ci.org/dig412/testcafe-browser-provider-fbsimctl)
[![npm](https://img.shields.io/npm/v/testcafe-browser-provider-fbsimctl.svg)](https://www.npmjs.com/package/testcafe-browser-provider-fbsimctl)

This is the **fbsimctl** browser provider plugin for [TestCafe](http://devexpress.github.io/testcafe).

It allows you to launch the iOS simulator for automated testing in Mobile Safari.
It uses Facebook's [fbsimctl](https://github.com/facebook/FBSimulatorControl/tree/master/fbsimctl) tool to interface with the Simulator.

## Install

```
npm install testcafe-browser-provider-fbsimctl
```

Requirements:

 * This plugin requires that you have XCode >= 8.2 installed, and the iOS simulator available.
 * [fbsimctl](https://github.com/facebook/FBSimulatorControl/tree/master/fbsimctl) must be installed and available on your `PATH`.
   ([Installation instructions](https://github.com/facebook/FBSimulatorControl/blob/master/fbsimctl/Documentation/Installation.md))

## Usage

When you run tests from the command line, use the alias when specifying browsers:

```
testcafe fbsimctl:device:os 'path/to/test/file.js'
```

where `device` is something like:

 * `iPhone 5`
 * `iPhone SE`

and `os` is something like:

 * `iOS 9.2`
 * `iOS 10.2`

 `os` is optional - if you exclude it then the most recent OS version will be chosen.

## Author
 Doug Fitzmaurice [https://www.ents24.com]()
