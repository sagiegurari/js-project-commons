'use strict';

var path = require('path');

/**
 * Loads env vars for build.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntEnv
 * @private
 */
module.exports.tasks = {
    env: {
        build: {
            src: path.join(global.build.options.buildConfig.projectRoot, '../env.json')
        }
    }
};
