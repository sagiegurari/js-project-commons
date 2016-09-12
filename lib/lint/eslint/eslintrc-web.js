'use strict';

/**
 * web eslint config.
 *
 * @author Sagie Gur-Ari
 * @namespace ESLintWebConfig
 * @private
 */

var config = require('./eslintrc-common');

//clone
config = JSON.parse(JSON.stringify(config));

config.env = {
    browser: true
};
config.rules.strict = [
    2,
    'function'
];
config.rules['no-implicit-globals'] = 2;

module.exports = config;
