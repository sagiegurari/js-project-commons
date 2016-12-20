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

    var lintTasks = [
        'markdownlint:full',
        'htmlhint:full',
        'htmllint:full',
        'csslint:full',
        'jsonlint:full',
        'jshint:full',
        'jshint:test',
        'jslint:full',
        'jslint:test',
        'jscs:full',
        'jscs:test'
    ];

    /*istanbul ignore next*/
    if (global.build.options.buildConfig.es6Support) {
        lintTasks.push('stylelint:full');
    }

    /*istanbul ignore else*/
    if (helper.isESlintSupported(global.build.options.buildConfig)) {
        lintTasks = lintTasks.concat([
            'eslint:full',
            'eslint:test'
        ]);
    }

    return {
        tasks: {
            concurrent: {
                lint: {
                    target: lintTasks
                }
            }
        }
    };
};
