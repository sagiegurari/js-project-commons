'use strict';

/**
 * node.js eslint config.
 *
 * @author Sagie Gur-Ari
 * @namespace ESLintNodeConfig
 * @private
 */

let config = require('./eslintrc-common');

//clone
config = JSON.parse(JSON.stringify(config));

config.env = {
    node: true
};
config.rules.strict = [
    2,
    'global'
];
config.rules['no-implicit-globals'] = 0;

module.exports = config;
