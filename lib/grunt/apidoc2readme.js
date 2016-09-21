'use strict';

var path = require('path');

/**
 * Grunt api docs to readme task helper.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntApiDocs2ReadmeTaskHelper
 * @private
 */
var readmeHelper = {
    /**
     * Returns the doc without specific api doc tags.
     *
     * @function
     * @memberof! GruntApiDocs2ReadmeTaskHelper
     * @private
     * @param {string} doc - The document text
     * @returns {string} The doc without specific api doc tags
     */
    removeTags: function (doc) {
        [
            'Returns',
            'Emits',
            'Access',
            'Kind'
        ].forEach(function removeLine(preTag) {
            preTag = '**' + preTag;

            var start = doc.indexOf(preTag);
            if (start !== -1) {
                var end = doc.indexOf('\n', start) + 1;

                doc = doc.substring(0, start) + doc.substring(end);
            }
        });

        return doc;
    },
    /**
     * Returns the doc with updated signature line.
     *
     * @function
     * @memberof! GruntApiDocs2ReadmeTaskHelper
     * @private
     * @param {string} doc - The document text
     * @param {boolean} [skipSignature] - True to not create a signature line, just remove it
     * @param {function} [postHook] - Will be invoked after the signature was modified
     * @returns {string} The updated doc
     */
    modifySignature: function (doc, skipSignature, postHook) {
        var index = doc.indexOf('\n');
        var functionLine = '';
        if (!skipSignature) {
            functionLine = doc.substring(0, index).substring(4); //get first line and remove initial ###

            //wrap with "'", replace object#function to object.function, remove <code>, fix escape chars
            functionLine = '### \'' + functionLine.split('#').join('.').split('<code>').join('').split('</code>').join('').split('&.').join('&#') + '\'';

            //remove links
            var foundLinks = false;
            var field;
            var start;
            var end;
            do {
                end = functionLine.indexOf('](');
                if (end !== -1) {
                    start = functionLine.lastIndexOf('[', end);
                    field = functionLine.substring(start + 1, end);

                    end = functionLine.indexOf(')', start) + 1;

                    functionLine = functionLine.substring(0, start) + field + functionLine.substring(end);

                    foundLinks = true;
                } else {
                    foundLinks = false;
                }
            } while (foundLinks);
        }

        if (functionLine) {
            functionLine = postHook(functionLine);
        }

        doc = functionLine + doc.substring(index);

        return doc;
    }
};

/**
 * The grunt task implement.
 *
 * @function
 * @memberof! GruntApiDocs2ReadmeTaskHelper
 * @private
 * @param {object} grunt - The grunt instance
 */
module.exports = function runTask(grunt) {
    /*eslint-disable no-invalid-this*/
    var options = this.options({});
    /*eslint-enable no-invalid-this*/

    var modifySignature = options.modifySignature;

    var readmeFile = path.join(global.build.options.buildConfig.projectRoot, 'README.md');
    var readme = grunt.file.read(readmeFile, {
        encoding: 'utf8'
    });

    var apiDocs = grunt.file.read(path.join(global.build.options.buildConfig.projectRoot, 'docs/api.md'), {
        encoding: 'utf8'
    });

    var tags = options.tags || {};
    var readmeLinks = Object.keys(tags);

    if (readmeLinks.length) {
        readmeLinks.forEach(function copyDoc(readmeLink) {
            var apiDocLink = tags[readmeLink];

            var skipSignature = false;
            if (typeof apiDocLink === 'object') {
                skipSignature = apiDocLink.skipSignature;
                apiDocLink = apiDocLink.tag;
            }

            var index = apiDocs.indexOf('<a name="' + apiDocLink + '"></a>');
            if (index === -1) {
                grunt.fail.warn(new Error('API link: ' + apiDocLink + ' not found.'));
            }

            var start = apiDocs.indexOf('###', index);
            var end = apiDocs.indexOf('<a', start);
            if (end === -1) {
                end = apiDocs.length;
            }

            var doc = apiDocs.substring(start, end);

            //remove params table
            index = doc.indexOf('| Param |');
            if (index !== -1) {
                doc = doc.substring(0, index) + doc.substring(doc.indexOf('\n\n', index) + 2);
            }

            //remove specific lines
            doc = readmeHelper.removeTags(doc);

            //modify function signature
            doc = readmeHelper.modifySignature(doc, skipSignature, modifySignature);

            readmeLink = '<a name="' + readmeLink + '"></a>';
            start = readme.indexOf(readmeLink);
            if (start === -1) {
                grunt.fail.warn(new Error('README link: ' + readmeLink + ' not found.'));
            }

            start = start + readmeLink.length + 1;
            if (skipSignature) {
                start = readme.indexOf('\n\n', start);
                end = start + 1;
            } else {
                end = start;
            }

            doc = doc.split('\n\n\n').join('\n\n');
            var firstEOL = '';
            var secondEOL = '\n';
            if (skipSignature) {
                firstEOL = '\n';
                secondEOL = '';
            }
            doc = firstEOL + '<!-- markdownlint-disable MD009 MD031 MD036 -->' + secondEOL + doc + '<!-- markdownlint-enable MD009 MD031 MD036 -->\n';

            readme = readme.substring(0, start) + doc + readme.substring(end);
        });

        grunt.file.write(readmeFile, readme, {
            encoding: 'utf8'
        });
    }
};
