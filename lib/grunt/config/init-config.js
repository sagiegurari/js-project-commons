'use strict';

const fs = require('fs');
const path = require('path');
const extend = require('node.extend');

/**
 * Returns the build config object.
 *
 * @function
 * @memberof! GruntInitConfig
 * @private
 * @param {Object} grunt - The grunt instance
 * @param {Object} options - Any additional grunt config data
 * @param {Object} [projectConfig] - Optional project specific config
 * @returns {Object} Grunt config object
 */
function createBuildConfig(grunt, options, projectConfig) {
    let configType = 'grunt-web';
    if (options.buildConfig.dualProject) {
        configType = 'grunt-dual';
    } else if (options.buildConfig.nodeProject) {
        configType = 'grunt-node';
    }

    const loader = require('./' + configType);

    return loader(grunt, options, projectConfig);
}

/**
 * Initializes the grunt build config.
 *
 * @function
 * @memberof! GruntInitConfig
 * @private
 * @param {Object} grunt - The grunt instance
 * @param {Object} options - Any additional grunt config data
 * @param {Object} [projectConfig] - Optional project specific config
 */
module.exports = function (grunt, options, projectConfig) {
    if (!options.buildConfig.projectRoot) {
        throw new Error('Property: options.buildConfig.projectRoot missing');
    }

    if (options.buildConfig.dualProject) {
        options.buildConfig.nodeProject = false;
    } else if (options.buildConfig.nodeProject === undefined) {
        throw new Error('Property: options.buildConfig.nodeProject missing');
    }

    /*istanbul ignore if*/
    if (!options.buildConfig.disableGruntPlugins) {
        require('time-grunt')(grunt);
    }

    options = extend(true, {
        buildConfig: {
            libDirectory: 'lib',
            testDirectory: 'test',
            docsDirectory: 'docs',
            targetDirectory: 'target',
            nodeMajorVersion: Number(process.version.match(/^v(\d+)/)[1])
        }
    }, options);

    //load package json
    options.buildConfig.packageJSON = require(path.join(options.buildConfig.projectRoot, 'package.json'));

    //load bower json if found
    const bowerJSONFile = path.join(options.buildConfig.projectRoot, 'bower.json');

    /*jslint stupid: true*/
    /*eslint-disable no-sync*/
    if (fs.existsSync(bowerJSONFile)) {
        options.buildConfig.bowerJSON = require(bowerJSONFile);
    }
    /*eslint-enable no-sync*/
    /*jslint stupid: false*/

    if (options.buildConfig.es6Support === undefined) {
        options.buildConfig.es6Support = (options.buildConfig.nodeMajorVersion >= 4);
    }

    global.build = {
        options
    };

    const configs = createBuildConfig(grunt, options, projectConfig);

    global.gruntConfig = configs;

    grunt.initConfig(configs);
};
