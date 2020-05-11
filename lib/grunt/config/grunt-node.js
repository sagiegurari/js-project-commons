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
    const factory = require('./grunt-common');

    grunt.loadNpmTasks('grunt-mocha-istanbul');

    return factory(grunt, options, [
        'mocha'
    ], projectConfig);
};
