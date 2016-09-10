'use strict';

/**
 * node.js grunt build config.
 *
 * @function
 * @memberof! GruntNodeConfig
 * @private
 * @param {Object} grunt - The grunt instance
 * @param {Object} options - Any additional grunt config data
 * @param {Object} [projectConfig] - Optional project specific config
 * @returns {Object} Grunt config object
 */
module.exports = function (grunt, options, projectConfig) {
    var factory = require('./grunt-common');

    return factory(grunt, options, [
        'mocha'
    ], projectConfig);
};
