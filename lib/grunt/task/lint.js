'use strict';

const helper = require('../helper');

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

    let lintTasks = [
        'markdownlint:full',
        'htmlhint:full',
        'htmllint:full',
        'csslint:full',
        'jsonlint:full',
        'jshint:full',
        'jshint:test',
        'jscs:full',
        'jscs:test',
        'filenames:full'
    ];

    /*istanbul ignore next*/
    if (global.build.options.buildConfig.es6Support) {
        lintTasks.push('yaml_validator:full');

        if (global.build.options.buildConfig.nodeMajorVersion >= 6) {
            lintTasks.push('stylelint:full');
        }
    }

    /*istanbul ignore next*/
    if (global.build.options.buildConfig.jslintEnabled) {
        lintTasks = lintTasks.concat([
            'jslint:full',
            'jslint:test'
        ]);
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
