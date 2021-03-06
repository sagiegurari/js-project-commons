'use strict';

const extend = require('node.extend');

/**
 * Common grunt build config.
 *
 * @function
 * @memberof! GruntCommonConfig
 * @private
 * @param {Object} grunt - The grunt instance
 * @param {Object} options - Any additional grunt config data
 * @param {Array} taskNames - Additional task names for the specific env
 * @param {Object} [projectConfig] - Optional project specific config
 * @returns {Object} Grunt config object
 */
module.exports = function (grunt, options, taskNames, projectConfig) {
    const config = {};

    taskNames = taskNames.concat([
        'clean',
        'coveralls',
        'csslint',
        'docs',
        'env',
        'eslint',
        'filenames',
        'gitdown',
        'htmlhint',
        'htmllint',
        'integration-test',
        'jsbeautifier',
        'jscs',
        'jsdoc2md',
        'jshint',
        'jslint',
        'jsonlint',
        'lint',
        'markdownlint',
        'mocha',
        'release',
        'security',
        'stylelint',
        'top-level',
        'version-check',
        'yaml-validator'
    ]);

    const loadTasks = function (task) {
        let taskConfig;
        if (typeof task === 'function') {
            taskConfig = task(grunt).tasks;
        } else {
            taskConfig = task.tasks;
        }

        extend(true, config, taskConfig);
    };

    taskNames.forEach(function loadConfig(taskName) {
        const task = require('../task/' + taskName);

        loadTasks(task);
    });

    if (projectConfig) {
        loadTasks(projectConfig);
    }

    extend(true, config, options);

    /*istanbul ignore if*/
    if (!options.buildConfig.disableGruntPlugins) {
        [
            'grunt-concurrent',
            'grunt-contrib-clean',
            'grunt-contrib-csslint',
            'grunt-contrib-jshint',
            'grunt-coveralls',
            'grunt-env',
            'grunt-filenames',
            'grunt-htmlhint',
            'grunt-htmllint',
            'grunt-jsbeautifier',
            'grunt-jscs',
            'grunt-jslint',
            'grunt-jsonlint',
            'grunt-markdownlint',
            'grunt-retire',
            'grunt-snyk'
        ].forEach(function loadTask(taskName) {
            grunt.loadNpmTasks(taskName);
        });

        //load optional plugins
        if (options.buildConfig.es6Support) {
            [
                'grunt-eslint',
                'grunt-gitdown',
                'grunt-jsdoc-to-markdown',
                'grunt-release',
                'grunt-shell',
                'grunt-version-check',
                'grunt-yaml-validator'
            ].forEach(function loadTask(taskName) {
                grunt.loadNpmTasks(taskName);
            });

            if (options.buildConfig.nodeMajorVersion >= 6) {
                [
                    'grunt-stylelint'
                ].forEach(function loadTask(taskName) {
                    grunt.loadNpmTasks(taskName);
                });
            }
        }
    }

    return config;
};
