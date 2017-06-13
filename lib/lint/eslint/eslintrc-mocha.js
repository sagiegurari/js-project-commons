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
config.rules['array-bracket-newline'] = 'off';
config.rules['no-console'] = 'off';
config.rules['id-length'] = 'off';
config.rules['no-invalid-this'] = 'off';
config.rules['new-cap'] = 'off';
config.rules.camelcase = 'off';
config.rules['array-callback-return'] = 'off';
config.rules['require-jsdoc'] = 'off';

module.exports = config;
