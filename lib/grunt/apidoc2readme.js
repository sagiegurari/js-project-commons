'use strict';

const path = require('path');

/**
 * Grunt api docs to readme task helper.
 *
 * @author Sagie Gur-Ari
 * @namespace GruntApiDocs2ReadmeTaskHelper
 * @private
 */
const readmeHelper = {
    /**
     * Returns the doc without specific api doc tags.
     *
     * @function
     * @memberof! GruntApiDocs2ReadmeTaskHelper
     * @private
     * @param {String} doc - The document text
     * @returns {String} The doc without specific api doc tags
     */
    removeTags(doc) {
        [
            'Returns',
            'Emits',
            'Access',
            'Kind'
        ].forEach(function removeLine(preTag) {
            preTag = '**' + preTag;

            const start = doc.indexOf(preTag);
            if (start !== -1) {
                const end = doc.indexOf('\n', start) + 1;

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
     * @param {String} doc - The document text
     * @param {Boolean} [skipSignature] - True to not create a signature line, just remove it
     * @param {function} [postHook] - Will be invoked after the signature was modified
     * @returns {String} The updated doc
     */
    modifySignature(doc, skipSignature, postHook) {
        const index = doc.indexOf('\n');
        let functionLine = '';
        if (!skipSignature) {
            functionLine = doc.substring(0, index).substring(4); //get first line and remove initial ###

            //wrap with "'", replace object#function to object.function, remove <code>, fix escape chars
            functionLine = '### \'' + functionLine.split('#').join('.').split('<code>').join('').split('</code>').join('').split('&.').join('&#') + '\'';

            //remove links
            let foundLinks = false;
            let field;
            let start;
            let end;
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

        if (functionLine && postHook && (typeof postHook === 'function')) {
            functionLine = postHook(functionLine);
        }

        doc = functionLine + doc.substring(index);

        return doc;
    },
    /**
     * Returns the link location in the docs.
     *
     * @function
     * @memberof! GruntApiDocs2ReadmeTaskHelper
     * @private
     * @param {Object} grunt - The grunt instance
     * @param {String} apiDocs - The document text
     * @param {String} apiDocLink - The link to search for
     * @param {Number} [occurrence] - The occurrence number
     * @returns {Number} The location of the requested link
     */
    getLinkLocation(grunt, apiDocs, apiDocLink, occurrence) {
        occurrence = occurrence || 1;

        const linkString = '<a name="' + apiDocLink + '"></a>';
        let index = -1;
        for (let occurrenceIndex = 0; occurrenceIndex < occurrence; occurrenceIndex++) {
            index = apiDocs.indexOf(linkString, index + 1);

            if (index === -1) {
                grunt.fail.warn(new Error('API link: ' + apiDocLink + ' not found.'));
            }
        }

        return index;
    }
};

/**
 * The grunt task implement.
 *
 * @function
 * @memberof! GruntApiDocs2ReadmeTaskHelper
 * @private
 * @param {Object} grunt - The grunt instance
 */
module.exports = function runTask(grunt) {
    /*eslint-disable no-invalid-this*/
    const options = this.options({});
    /*eslint-enable no-invalid-this*/

    const modifySignature = options.modifySignature;

    const readmeFile = path.join(global.build.options.buildConfig.projectRoot, 'README.md');
    let readme = grunt.file.read(readmeFile, {
        encoding: 'utf8'
    });

    const apiDocs = grunt.file.read(path.join(global.build.options.buildConfig.projectRoot, 'docs/api.md'), {
        encoding: 'utf8'
    });

    const tags = options.tags || {};
    const readmeLinks = Object.keys(tags);

    if (readmeLinks.length) {
        readmeLinks.forEach(function copyDoc(readmeLink) {
            let apiDocLink = tags[readmeLink];

            let skipSignature = false;
            let occurrence = 1;
            if (typeof apiDocLink === 'object') {
                skipSignature = apiDocLink.skipSignature;
                occurrence = apiDocLink.occurrence;
                apiDocLink = apiDocLink.tag;
            }

            let index = readmeHelper.getLinkLocation(grunt, apiDocs, apiDocLink, occurrence);

            let start = apiDocs.indexOf('###', index);
            let end = apiDocs.indexOf('<a', start);
            if (end === -1) {
                end = apiDocs.length;
            }

            let doc = apiDocs.substring(start, end);

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
            let firstEOL = '';
            let secondEOL = '\n';
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
