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
        'common',
        'coveralls',
        'csslint',
        'docs',
        'eslint',
        'gitdown',
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
        'top-level'
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

    return config;
};
