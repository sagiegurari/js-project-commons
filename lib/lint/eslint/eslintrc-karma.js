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

config.env.phantomjs = true;
config.env.mocha = true;
config.globals = {
    angular: true
};
config.rules['no-console'] = 'off';
config.rules['id-length'] = 'off';
config.rules['no-invalid-this'] = 'off';
config.rules['new-cap'] = 'off';
config.rules.camelcase = 'off';
config.rules['array-callback-return'] = 'off';

module.exports = config;
