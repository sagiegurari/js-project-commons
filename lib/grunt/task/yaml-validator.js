'use strict';

var src = [
    '*.yml',
    '.*.yml',
    '.snyk',
    'project/**/*.yml',
    '<%=buildConfig.testDirectory%>/**/*.yml'
];

/*istanbul ignore else*/
if (global.build.options.buildConfig.nodeProject) {
    src.push('<%=buildConfig.libDirectory%>/**/*.yml');
}

//jscs:disable requireCamelCaseOrUpperCaseIdentifiers
/*eslint-disable camelcase*/
/**
 * YAMLValidator task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntYAMLValidator
 * @private
 */
module.exports.tasks = {
    yaml_validator: {
        full: {
            options: {
                yaml: true
            },
            src: src
        }
    }
};
/*eslint-enable camelcase*/
//jscs:enable requireCamelCaseOrUpperCaseIdentifiers
