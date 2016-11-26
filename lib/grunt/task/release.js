'use strict';

var helper = require('../helper');

/**
 * Release task definition.
 *
 * @function
 * @memberof! GruntRelease
 * @private
 * @param {Object} grunt - The grunt instance
 * @returns {Object} Grunt config object
 */
module.exports = function (grunt) {
    grunt.registerTask('post-publish', 'Run all post publish steps.', [
        'github-release:full'
    ]);

    return {
        'github-release': {
            full: {
                options: {
                    repository: helper.getRepoName(global.build.options.buildConfig),
                    auth: {
                        user: helper.getRepoUserName(global.build.options.buildConfig),
                        password: process.env.GHTOKEN
                    }
                }
            }
        }
    };
};
