'use strict';

var extend = require('node.extend');

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
    var config = {};

    taskNames = taskNames.concat([
        'clean',
        'coveralls',
        'csslint',
        'docs',
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
        'version-check'
    ]);

    var loadTasks = function (task) {
        var taskConfig;
        if (typeof task === 'function') {
            taskConfig = task(grunt).tasks;
        } else {
            taskConfig = task.tasks;
        }

        extend(true, config, taskConfig);
    };

    taskNames.forEach(function loadConfig(taskName) {
        var task = require('../task/' + taskName);

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
            'grunt-filenames',
            'grunt-htmlhint',
            'grunt-htmllint',
            'grunt-jsbeautifier',
            'grunt-jscs',
            'grunt-jsdoc-to-markdown',
            'grunt-jslint',
            'grunt-jsonlint',
            'grunt-markdownlint',
            'grunt-retire'
        ].forEach(function loadTask(taskName) {
            grunt.loadNpmTasks(taskName);
        });

        //load optional plugins
        if (options.buildConfig.es6Support) {
            [
                'grunt-eslint',
                'grunt-gitdown',
                'grunt-release',
                'grunt-stylelint',
                'grunt-version-check'
            ].forEach(function loadTask(taskName) {
                grunt.loadNpmTasks(taskName);
            });
        }
    }

    return config;
};
