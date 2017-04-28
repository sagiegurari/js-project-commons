'use strict';

//jscs:disable requireCamelCaseOrUpperCaseIdentifiers
/*eslint-disable camelcase*/

/**
 * Mocha task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntMocha
 * @private
 */
module.exports.tasks = {
    mocha_istanbul: {
        coverageNode: {
            src: './<%=buildConfig.testDirectory%>/**/*spec.js',
            options: {
                coverageFolder: '<%=buildConfig.targetDirectory%>/coverage/report',
                mask: '*spec.js',
                root: './<%=buildConfig.libDirectory%>',
                check: {
                    lines: 100,
                    statements: 100,
                    branches: 100,
                    functions: 100
                },
                reportFormats: ['html', 'lcovonly', 'text-summary']
            }
        },
        coverageDual: {
            src: './<%=buildConfig.testDirectory%>/**/*spec.js',
            options: {
                coverageFolder: '<%=buildConfig.targetDirectory%>/coverage/report',
                mask: '*-node-spec.js',
                check: {
                    lines: 100,
                    statements: 100,
                    branches: 100,
                    functions: 100
                },
                reportFormats: ['html', 'lcovonly', 'text-summary']
            }
        }
    }
};
