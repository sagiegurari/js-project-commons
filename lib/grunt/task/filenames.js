'use strict';

var helper = require('../helper');

var sources = helper.getProjectSources(global.build.options.buildConfig, {
    includeLib: true,
    includeBuild: true,
    includeTest: true
});
sources = sources.concat(helper.getCSSSources());
sources = sources.concat(helper.getHTMLSources());

/*eslint-disable no-useless-escape*/
/**
 * Filenames task definition.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntFilenames
 * @private
 */
module.exports.tasks = {
    filenames: {
        full: {
            options: {
                valid: /^[a-z0-9]+[\-a-z0-9]*\.(js|json|html|css|less|scss)$/u,
                except: [
                    'Gruntfile.js',
                    'stylelint.config.js',
                    'karma.conf.js'
                ]
            },
            src: sources
        }
    }
};
/*eslint-enable no-useless-escape*/
