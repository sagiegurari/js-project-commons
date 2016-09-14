'use strict';

var helper = require('../helper');

/**
 * JSHint task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntJSHint
 * @private
 */
module.exports.tasks = {
    jshint: {
        full: {
            options: {
                jshintrc: true
            },
            files: {
                src: helper.getProjectSources(global.build.options.buildConfig, {
                    includeLib: true,
                    includeBuild: true
                })
            }
        },
        test: {
            options: {
                jshintrc: helper.getJSHintTestConfigFile(global.build.options.buildConfig)
            },
            files: {
                src: helper.getProjectSources(global.build.options.buildConfig, {
                    includeLib: false,
                    includeTest: true
                })
            }
        }
    }
};
