'use strict';

var path = require('path');
var extend = require('node.extend');

/*jslint nomen: true*/
//jscs:disable disallowDanglingUnderscores
/*eslint-disable no-underscore-dangle*/
var currentDirectory = __dirname;
/*eslint-enable no-underscore-dangle*/
//jscs:enable disallowDanglingUnderscores
/*jslint nomen: false*/

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
        var configFile;
        var suffix = 'karma';
        if (buildConfig.nodeProject) {
            suffix = 'mocha';
        }

        configFile = path.join(currentDirectory, '../lint/eslint/eslintrc-' + suffix + '.js');

        return configFile;
    },
    /**
     * Returns the jshint test sources config file location.
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @param {Object} buildConfig - The grunt buildConfig data
     * @returns {string} The jshint test sources config file location
     */
    getJSHintTestConfigFile: function (buildConfig) {
        var configFile;
        var suffix = 'karma';
        if (buildConfig.nodeProject) {
            suffix = 'mocha';
        }

        configFile = path.join(currentDirectory, '../lint/jshint/jshint-' + suffix + '.json');

        return configFile;
    },
    /**
     * Returns the jscs test sources config file location.
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @returns {string} The jscs test sources config file location
     */
    getJSCSTestConfigFile: function () {
        return path.join(currentDirectory, '../lint/jscs/jscs-test.json');
    },
    /**
     * Returns the jslint test config.
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @param {Object} buildConfig - The grunt buildConfig data
     * @param {Object} config - The JSLint config used for non test files
     * @returns {Object} The JSLint config
     */
    getJSLintTestConfig: function (buildConfig, config) {
        var testConfig = extend(true, {}, config || {}, {
            nomen: true,
            unparam: true,
            predef: [
                'it',
                'describe'
            ]
        });

        if (!buildConfig.nodeProject) {
            testConfig.predef.push('angular');
        }

        return testConfig;
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
     * @returns {Array} The project sources paths
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
    },
    /**
     * Returns the HTML file paths.
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @returns {Array} The HTML file paths
     */
    getHTMLSources: function () {
        return [
            '<%=buildConfig.libDirectory%>/**/*.html',
            '<%=buildConfig.docsDirectory%>/**/*.html'
        ];
    },
    /**
     * Returns the CSS file paths.
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @returns {Array} The CSS file paths
     */
    getCSSSources: function () {
        return [
            '<%=buildConfig.libDirectory%>/**/*.css',
            '<%=buildConfig.docsDirectory%>/**/*.css'
        ];
    }
};
