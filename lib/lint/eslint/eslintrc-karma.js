'use strict';

/**
 * karma eslint config.
 *
 * @author Sagie Gur-Ari
 * @namespace ESLintKarmaConfig
 * @private
 */

var config = require('./eslintrc-web');

//clone
config = JSON.parse(JSON.stringify(config));

config.env.mocha = true;
config.env.phantomjs = true;
config.rules.strict = [
    2,
    'global'
];

module.exports = config;
