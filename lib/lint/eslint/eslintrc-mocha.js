'use strict';

/**
 * Mocha eslint config.
 *
 * @author Sagie Gur-Ari
 * @namespace ESLintMochaConfig
 * @private
 */

var config = require('./eslintrc-node');

//clone
config = JSON.parse(JSON.stringify(config));

config.env.mocha = true;

module.exports = config;
