'use strict';

/**
 * Clean task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntClean
 * @private
 */
module.exports.tasks = {
    clean: {
        options: {
            force: true
        },
        dot: 'true',
        target: {
            src: [
                '<%=buildConfig.targetDirectory%>/**'
            ]
        },
        lock: {
            src: [
                '<%=buildConfig.projectRoot%>/package-lock.json',
                '<%=buildConfig.projectRoot%>/yarn.lock'
            ]
        }
    }
};
