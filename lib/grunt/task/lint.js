'use strict';

var helper = require('../helper');

/**
 * Defines all linting task.
 *
 * @function
 * @memberof! GruntLint
 * @private
 * @param {Object} grunt - The grunt instance
 * @returns {Object} Grunt config object
 */
module.exports = function (grunt) {
    grunt.registerTask('lint', 'Linting tasks.', [
        'concurrent:lint'
    ]);

    var eslintPrefix = helper.getESlintTaskPrefix(global.build.options.buildConfig);

    return {
        tasks: {
            concurrent: {
                lint: {
                    target: [
                        'markdownlint:full',
                        'jsonlint:full',
                        'jshint:full',
                        'jslint:full',
                        eslintPrefix + 'eslint:full',
                        'jscs:full'
                    ]
                }
            }
        }
    };
};