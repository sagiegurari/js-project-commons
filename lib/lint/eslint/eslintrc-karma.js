'use strict';

/**
 * karma eslint config.
 *
 * @author Sagie Gur-Ari
 * @namespace ESLintKarmaConfig
 * @private
 */

let config = require('./eslintrc-web');

//clone
config = JSON.parse(JSON.stringify(config));

config.env.phantomjs = true;
config.env.mocha = true;
config.globals = {
    angular: true
};
config.rules['array-bracket-newline'] = 'off';
config.rules['array-element-newline'] = 'off';
config.rules['no-console'] = 'off';
config.rules['id-length'] = 'off';
config.rules['no-invalid-this'] = 'off';
config.rules['new-cap'] = 'off';
config.rules.camelcase = 'off';
config.rules['array-callback-return'] = 'off';
config.rules['require-jsdoc'] = 'off';

module.exports = config;
