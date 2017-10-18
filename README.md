# typescript-starter-cycle
An opinionated starter for Cycle.js projects powered by TypeScript.

## Features
* TypeScript
* Webpack
* Visual Studio Code integrations
* Hot Module Reloading
* TypeStyle for styles
* Unit testing with Mocha and Chai
* UI Integration tests with Cypress
* Async imports and dynamic routing
* Simple routing with layouts

##### Visual Studio Code Specifics
This repository is optimized for [Visual Studio Code](https://code.visualstudio.com/).
We have launch configurations, an editor config file, and workspace settings.

To make full use of these, you need the following extensions:
* [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
* [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

##### Notes
* If using on Windows machines, make sure you have the [build tools](https://github.com/felixrieseberg/windows-build-tools) ready before doing an `npm install`.
* If hosting on a subdirectory, you need to change the `PROJECT_PUBLIC_PATH` in `webpack.config.js` only for production. You can do this by changing line #32 of the file to `var PROJECT_PUBLIC_PATH = __PROD__ ? '<your-public-path-here>' : '/';`
