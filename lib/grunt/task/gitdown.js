'use strict';

/**
 * Gitdown task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntGitdown
 * @private
 */
module.exports.tasks = {
    gitdown: {
        readme: {
            options: {
                gitinfo: {
                    gitPath: '<%=buildConfig.projectRoot%>'
                },
                headingNesting: {
                    enabled: false
                }
            },
            files: {
                'README.md': './project/config/README-template.md'
            }
        }
    }
};
