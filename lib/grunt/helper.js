'use strict';

var path = require('path');

/**
 * Grunt task helper.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntTaskHelper
 * @private
 */
module.exports = {
    /**
     * Returns the eslint task prefix (force or not) based on the build env.
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @param {Object} buildConfig - The grunt buildConfig data
     * @returns {string} The eslint task prefix
     */
    getESlintTaskPrefix: function (buildConfig) {
        var eslintPrefix = '';
        if (!buildConfig.es6Support) {
            eslintPrefix = 'force:';
        }

        return eslintPrefix;
    },
    /**
     * Returns the eslint test sources config file location.
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @param {Object} buildConfig - The grunt buildConfig data
     * @returns {string} The eslint test sources config file location
     */
    getESlintTestConfigFile: function (buildConfig) {
        /*jslint nomen: true*/
        //jscs:disable disallowDanglingUnderscores
        /*eslint-disable no-underscore-dangle*/
        var currentDirectory = __dirname;
        /*eslint-enable no-underscore-dangle*/
        //jscs:enable disallowDanglingUnderscores
        /*jslint nomen: false*/

        var configFile;
        var suffix = 'karma';
        if (buildConfig.nodeProject) {
            suffix = 'mocha';
        }

        configFile = path.join(currentDirectory, '../lint/eslint/eslintrc-' + suffix + '.js');

        return configFile;
    },
    /**
     * Returns the project sources paths.
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @param {Object} buildConfig - The grunt buildConfig data
     * @param {Object} [options] - Any optional options
     * @param {boolean} [options.includeLib=false] - True if to include the main library files
     * @param {boolean} [options.includeBuild=false] - True if to include build files
     * @param {boolean} [options.includeTest=false] - True if to include test files
     * @returns {string} The project sources paths
     */
    getProjectSources: function (buildConfig, options) {
        options = options || {};

        var includeLib = options.includeLib;
        if (includeLib === undefined) {
            includeLib = true;
        }

        var src = [];
        if (includeLib) {
            if (buildConfig.nodeProject) {
                src = src.concat([
                    '*.js',
                    '<%=buildConfig.libDirectory%>/**/*.js'
                ]);
            } else if (buildConfig.bowerJSON && buildConfig.bowerJSON.main) {
                src.push(buildConfig.bowerJSON.main);
            }
        }

        if (options.includeBuild) {
            src.push('project/**/*.js');
        }

        if (options.includeTest) {
            src.push('<%=buildConfig.testDirectory%>/**/*spec.js');
        }

        return src;
    },
    /**
     * Returns the API sources paths (used to generate API do).
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @param {Object} buildConfig - The grunt buildConfig data
     * @returns {string} The API sources paths
     */
    getAPISources: function (buildConfig) {
        var src;
        if (buildConfig.nodeProject) {
            src = '<%=buildConfig.libDirectory%>/**/*.js';
        } else if (buildConfig.bowerJSON) {
            src = buildConfig.bowerJSON.main;
        }

        return src;
    }
};
