'use strict';

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
     * Returns the project sources paths.
     *
     * @function
     * @memberof! GruntTaskHelper
     * @private
     * @param {Object} buildConfig - The grunt buildConfig data
     * @param {boolean} [excludeBuild=false] - True if to exclude build files
     * @returns {string} The project sources paths
     */
    getProjectSources: function (buildConfig, excludeBuild) {
        var src = [];
        if (buildConfig.nodeProject) {
            src = src.concat([
                '*.js',
                '<%=buildConfig.libDirectory%>/**/*.js'
            ]);
        } else if (buildConfig.bowerJSON) {
            src.push(buildConfig.bowerJSON.main);
        }

        if (!excludeBuild) {
            src.push('project/**/*.js');
        }

        return src;
    },
    /**
     * Returns the API sources paths.
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
