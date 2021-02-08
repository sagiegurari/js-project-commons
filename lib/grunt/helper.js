'use strict';

const path = require('path');
const extend = require('node.extend');

/*jslint nomen: true*/
//jscs:disable disallowDanglingUnderscores
/*eslint-disable no-underscore-dangle*/
const currentDirectory = __dirname;
/*eslint-enable no-underscore-dangle*/
//jscs:enable disallowDanglingUnderscores
/*jslint nomen: false*/

function addLibSources(buildConfig, options) {
    let src = [];
    if (options.includeLib || options.includeLib === undefined) {
        if (buildConfig.nodeProject) {
            src = src.concat([
                '*.js',
                '<%=buildConfig.libDirectory%>/**/*.js'
            ]);
        } else if (buildConfig.packageJSON && buildConfig.packageJSON.main) {
            src.push(buildConfig.packageJSON.main);
        }
    }

    return src;
}

/**
 * Grunt task helper.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntTaskHelper
 * @private
 */
module.exports = {
    /**
     * Returns the repo name (user/name).
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @param {Object} buildConfig - The grunt buildConfig data
     * @returns {String} The repo name
     */
    getRepoName(buildConfig) {
        const projectRoot = buildConfig.projectRoot;
        const packageFile = path.join(projectRoot, 'package.json');

        const url = require(packageFile).repository.url;
        const prefix = 'github.com/';

        return url.substring(url.indexOf(prefix) + prefix.length, url.lastIndexOf('.git'));
    },
    /**
     * Returns the repo user name.
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @param {Object} buildConfig - The grunt buildConfig data
     * @returns {String} The repo user name
     */
    getRepoUserName(buildConfig) {
        const repo = this.getRepoName(buildConfig);

        return repo.split('/')[0];
    },
    /**
     * Returns true if eslint is supported on the current platform.
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @param {Object} buildConfig - The grunt buildConfig data
     * @returns {Boolean} True if supported
     */
    isESlintSupported(buildConfig) {
        return buildConfig.es6Support;
    },
    /**
     * Returns the eslint test sources config file location.
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @param {Object} buildConfig - The grunt buildConfig data
     * @returns {String} The eslint test sources config file location
     */
    getESlintTestConfigFile(buildConfig) {
        let suffix = 'karma';
        if (buildConfig.nodeProject) {
            suffix = 'mocha';
        }

        return path.join(currentDirectory, '../lint/eslint/eslintrc-' + suffix + '.js');
    },
    /**
     * Returns the jshint test sources config file location.
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @param {Object} buildConfig - The grunt buildConfig data
     * @returns {String} The jshint test sources config file location
     */
    getJSHintTestConfigFile(buildConfig) {
        let suffix = 'karma';
        if (buildConfig.nodeProject) {
            suffix = 'mocha';
        }

        return path.join(currentDirectory, '../lint/jshint/jshint-' + suffix + '.json');
    },
    /**
     * Returns the jscs test sources config file location.
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @returns {String} The jscs test sources config file location
     */
    getJSCSTestConfigFile() {
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
    getJSLintTestConfig(buildConfig, config) {
        const testConfig = extend(true, {}, config || {}, {
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
     * @param {Boolean} [options.includeLib=false] - True if to include the main library files
     * @param {Boolean} [options.includeBuild=false] - True if to include build files
     * @param {Boolean} [options.includeTest=false] - True if to include test files
     * @returns {Array} The project sources paths
     */
    getProjectSources(buildConfig, options) {
        options = options || {};

        const src = addLibSources(buildConfig, options);

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
     * @returns {String} The API sources paths
     */
    getAPISources(buildConfig) {
        let src;
        if (buildConfig.nodeProject) {
            src = '<%=buildConfig.libDirectory%>/**/*.js';
        } else if (buildConfig.packageJSON) {
            src = buildConfig.packageJSON.main;
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
    getHTMLSources() {
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
    getCSSSources() {
        return [
            '<%=buildConfig.libDirectory%>/**/*.css',
            '<%=buildConfig.docsDirectory%>/**/*.css'
        ];
    },
    /**
     * Returns the MD file paths.
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @returns {Array} The MD file paths
     */
    getMDFiles() {
        return [
            '*.md',
            '.github/*.md'
        ];
    }
};
