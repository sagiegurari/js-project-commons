'use strict';

var path = require('path');

/**
 * Version check task definition.
 *
 * @function
 * @namespace GruntVersionCheck
 * @private
 */
module.exports.tasks = {
    versioncheck: {
        full: {
            options: {
                packageLocation: path.join(global.build.options.buildConfig.projectRoot, 'package.json'),
                bowerLocation: path.join(global.build.options.buildConfig.projectRoot, 'bower.json'),
                hideUpToDate: false,
                showPrerelease: false
            }
        }
    }
};
