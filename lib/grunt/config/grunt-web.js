'use strict';

/**
 * web grunt build config.
 *
 * @function
 * @memberof! GruntWebConfig
 * @private
 * @param {Object} grunt - The grunt instance
 * @param {Object} options - Any additional grunt config data
 * @param {Object} [projectConfig] - Optional project specific config
 * @returns {Object} Grunt config object
 */
module.exports = function (grunt, options, projectConfig) {
    const factory = require('./grunt-common');

    grunt.loadNpmTasks('grunt-karma');

    return factory(grunt, options, [
        'karma'
    ], projectConfig);
};
