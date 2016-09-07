'use strict';

/**
 * Karma task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntKarma
 * @private
 */
module.exports.tasks = {
    karma: {
        full: {
            configFile: './project/config/karma.conf.js',
            singleRun: true,
            browsers: [
                'PhantomJS'
            ]
        }
    }
};
