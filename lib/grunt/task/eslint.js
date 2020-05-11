'use strict';

const helper = require('../helper');

/**
 * ESLint task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntESLint
 * @private
 */
module.exports.tasks = {
    eslint: {
        full: {
            options: {
                configFile: '.eslintrc.js'
            },
            src: helper.getProjectSources(global.build.options.buildConfig, {
                includeLib: true,
                includeBuild: true
            })
        },
        test: {
            options: {
                configFile: helper.getESlintTestConfigFile(global.build.options.buildConfig)
            },
            src: helper.getProjectSources(global.build.options.buildConfig, {
                includeLib: false,
                includeTest: true
            })
        }
    }
};
