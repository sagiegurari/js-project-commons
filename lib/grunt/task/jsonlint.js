'use strict';

const src = [
    '*.json',
    '.jshintrc',
    '.jslintrc',
    '.jsbeautifyrc',
    'project/**/*.json',
    '<%=buildConfig.testDirectory%>/**/*.json'
];

/*istanbul ignore else*/
if (global.build.options.buildConfig.nodeProject) {
    src.push('<%=buildConfig.libDirectory%>/**/*.json');
}

/**
 * JSONLint task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntJSONLint
 * @private
 */
module.exports.tasks = {
    jsonlint: {
        full: {
            src
        },
        format: {
            src,
            options: {
                format: true,
                indent: 2
            }
        }
    }
};
