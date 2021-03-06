'use strict';

const path = require('path');
const helper = require('../helper');

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
        'env:build',
        'release'
    ]);

    return {
        tasks: {
            release: {
                options: {
                    bump: false,
                    changelog: false,
                    file: path.join(global.build.options.buildConfig.projectRoot, 'package.json'),
                    add: false,
                    commit: false,
                    tag: false,
                    push: false,
                    pushTags: false,
                    npm: false,
                    npmtag: false,
                    tagName: '<%= version %>',
                    tagMessage: '<%= version %>',
                    github: {
                        repo: helper.getRepoName(global.build.options.buildConfig),
                        accessTokenVar: 'GHTOKEN'
                    }
                }
            }
        }
    };
};
