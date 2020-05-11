'use strict';

const extend = require('node.extend');

/**
 * Sets the karma conf based on the provided project settings and internal default config.
 *
 * @function
 * @memberof! KarmaConf
 * @private
 * @param {Object} config - The karma config setter
 * @param {Object} [projectKarmaConfig] - The project karma config
 * @param {String} mainJSFile - The project JS file to test
 */
module.exports = function (config, projectKarmaConfig, mainJSFile) {
    const karmaConfig = {
        basePath: '../../',
        frameworks: [
            'mocha',
            'sinon-chai'
        ],
        port: 8080,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: [
            'ChromiumHeadless'
        ],
        singleRun: false,
        reporters: [
            'progress',
            'coverage'
        ],
        preprocessors: {},
        coverageReporter: {
            dir: 'target/coverage/report',
            reporters: [
                {
                    type: 'lcov',
                    subdir: '.'
                }
            ],
            check: {
                global: {
                    statements: 100,
                    functions: 100,
                    lines: 100,
                    branches: 100
                }
            }
        },
        customLaunchers: {
            ChromeHeadlessCI: {
                base: 'ChromeHeadless',
                flags: [
                    '--no-sandbox'
                ]
            }
        }
    };

    karmaConfig.preprocessors[mainJSFile] = [
        'coverage'
    ];

    if (projectKarmaConfig) {
        extend(true, karmaConfig, projectKarmaConfig);
    }

    if (process.env.CI) {
        karmaConfig.browsers = [
            'ChromeHeadlessCI'
        ];
    }

    config.set(karmaConfig);
};
