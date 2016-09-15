'use strict';

var helper = require('../helper');

/**
 * Defines jslint task.
 *
 * @function
 * @memberof! GruntJSLint
 * @private
 * @param {Object} grunt - The grunt instance
 * @returns {Object} Grunt config object
 */
module.exports = function (grunt) {
    var jslintConfig = grunt.file.readJSON('.jslintrc');

    return {
        tasks: {
            jslint: {
                full: {
                    src: helper.getProjectSources(global.build.options.buildConfig, {
                        includeLib: true,
                        includeBuild: true
                    }),
                    options: {
                        edition: 'latest',
                        failOnError: true
                    },
                    directives: jslintConfig
                },
                test: {
                    src: helper.getProjectSources(global.build.options.buildConfig, {
                        includeLib: false,
                        includeTest: true
                    }),
                    options: {
                        edition: 'latest',
                        failOnError: true
                    },
                    directives: helper.getJSLintTestConfig(global.build.options.buildConfig, jslintConfig)
                }
            }
        }
    };
};
