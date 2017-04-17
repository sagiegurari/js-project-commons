# js-project-commons

[![NPM Version](http://img.shields.io/npm/v/js-project-commons.svg?style=flat)](https://www.npmjs.org/package/js-project-commons) [![Build Status](https://travis-ci.org/sagiegurari/js-project-commons.svg)](http://travis-ci.org/sagiegurari/js-project-commons) [![Coverage Status](https://coveralls.io/repos/sagiegurari/js-project-commons/badge.svg)](https://coveralls.io/r/sagiegurari/js-project-commons) [![bitHound Code](https://www.bithound.io/github/sagiegurari/js-project-commons/badges/code.svg)](https://www.bithound.io/github/sagiegurari/js-project-commons) [![Inline docs](http://inch-ci.org/github/sagiegurari/js-project-commons.svg?branch=master)](http://inch-ci.org/github/sagiegurari/js-project-commons)<br>
[![License](https://img.shields.io/npm/l/js-project-commons.svg?style=flat)](https://github.com/sagiegurari/js-project-commons/blob/master/LICENSE) [![Total Downloads](https://img.shields.io/npm/dt/js-project-commons.svg?style=flat)](https://www.npmjs.org/package/js-project-commons) [![Dependency Status](https://david-dm.org/sagiegurari/js-project-commons.svg)](https://david-dm.org/sagiegurari/js-project-commons) [![devDependency Status](https://david-dm.org/sagiegurari/js-project-commons/dev-status.svg)](https://david-dm.org/sagiegurari/js-project-commons?type=dev)<br>

> Common web and node.js grunt tasks/lint configs/md templates and so on...

* [Overview](#overview)
* [Usage](#usage)
* [Installation](#installation)
* [API Documentation](docs/api.md)
* [Contributing](.github/CONTRIBUTING.md)
* [Release History](#history)
* [License](#license)

<a name="overview"></a>
## Overview
This library holds common build tasks, lint configuration and so on, used by my personal node.js and web projects.<br>
This allows for a central configuration for all projects.

<a name="usage"></a>
## Usage
In order to use this library, you need to refactor your build processes as defined in some of my projects such as [simple-oracledb](https://github.com/sagiegurari/simple-oracledb)

<a name="installation"></a>
## Installation
In order to use this library, just run the following npm install command:

```sh
npm install --save-dev js-project-commons
```

## API Documentation
See full docs at: [API Docs](docs/api.md)

## Contributing
See [contributing guide](.github/CONTRIBUTING.md)

<a name="history"></a>
## Release History

| Date        | Version | Description |
| ----------- | ------- | ----------- |
| 2017-04-17  | v1.0.71 | Added YAML validations |
| 2017-04-11  | v1.0.69 | Maintenance |
| 2017-04-11  | v1.0.68 | Modify stylelint rules configuration |
| 2017-03-09  | v1.0.67 | Maintenance |
| 2017-02-13  | v1.0.63 | jsdoc2md fix for windows |
| 2017-02-11  | v1.0.62 | Added env validation for build |
| 2017-02-10  | v1.0.61 | Maintenance |
| 2017-01-13  | v1.0.60 | No security validation for npm dependencies for web projects |
| 2017-01-13  | v1.0.59 | Adding file name linting |
| 2017-01-07  | v1.0.58 | Maintenance |
| 2017-01-06  | v1.0.57 | Updated api docs to readme generation task |
| 2016-12-31  | v1.0.56 | Maintenance |
| 2016-12-21  | v1.0.54 | Adding htmlhint to grunt build |
| 2016-12-20  | v1.0.53 | Maintenance |
| 2016-12-16  | v1.0.50 | Adding stylelint to grunt build |
| 2016-12-15  | v1.0.49 | Maintenance |
| 2016-12-15  | v1.0.48 | Adding security validations to grunt build |
| 2016-12-14  | v1.0.45 | Maintenance |
| 2016-11-26  | v1.0.44 | Create github release grunt task |
| 2016-11-22  | v1.0.39 | Maintenance |
| 2016-11-19  | v1.0.34 | Build dependencies are now packaged and loaded internally |
| 2016-11-15  | v1.0.33 | Maintenance |
| 2016-09-21  | v1.0.18 | Added api docs to readme generation task |
| 2016-09-15  | v1.0.17 | jslint will test spec files |
| 2016-09-14  | v1.0.16 | Maintenance |
| 2016-09-14  | v1.0.15 | jshint and jscs will test also spec files |
| 2016-09-13  | v1.0.14 | Maintenance |
| 2016-09-13  | v1.0.13 | Adding html and css linting support |
| 2016-09-12  | v1.0.12 | Maintenance |
| 2016-09-12  | v1.0.10 | eslint will test also spec files |
| 2016-09-11  | v1.0.9  | Maintenance |
| 2016-09-10  | v1.0.3  | Grunt tasks are now grouped to node/web build configs |
| 2016-09-07  | v1.0.2  | Maintenance |
| 2016-09-07  | v1.0.1  | Lazy loading of grunt task definitions |
| 2016-09-07  | v1.0.0  | Change hosted lint configurations |
| 2016-09-07  | v0.0.2  | Initial release. |

<a name="license"></a>
## License
Developed by Sagie Gur-Ari and licensed under the Apache 2 open source license.
