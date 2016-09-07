'use strict';

/**
 * Coverall task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntCoverall
 * @private
 */
module.exports.tasks = {
    coveralls: {
        options: {
            force: true
        },
        full: {
            src: '<%=buildConfig.targetDirectory%>/coverage/report/*.info'
        }
    }
};
