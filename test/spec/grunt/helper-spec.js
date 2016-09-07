'use strict';
/*global describe: false, it: false */

var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var helper = require('../../../lib/grunt/helper');

describe('Helper Tests', function () {
    describe('getESlintTaskPrefix', function () {
        it('es6 supported', function () {
            var prefix = helper.getESlintTaskPrefix({
                es6Support: true
            });

            assert.equal(prefix, '');
        });

        it('es6 not supported', function () {
            var prefix = helper.getESlintTaskPrefix({
                es6Support: false
            });

            assert.equal(prefix, 'force:');
        });
    });

    describe('getProjectSources', function () {
        it('node, no exclude', function () {
            var src = helper.getProjectSources({
                nodeProject: true
            }, false);

            assert.deepEqual(src, [
                '*.js',
                '<%=buildConfig.libDirectory%>/**/*.js',
                'project/**/*.js'
            ]);
        });

        it('node, exclude', function () {
            var src = helper.getProjectSources({
                nodeProject: true
            }, true);

            assert.deepEqual(src, [
                '*.js',
                '<%=buildConfig.libDirectory%>/**/*.js'
            ]);
        });

        it('web, no bower.json, no exclude', function () {
            var src = helper.getProjectSources({
                nodeProject: false
            }, false);

            assert.deepEqual(src, [
                'project/**/*.js'
            ]);
        });

        it('web, no bower.json, exclude', function () {
            var src = helper.getProjectSources({
                nodeProject: false
            }, true);

            assert.deepEqual(src, []);
        });

        it('web, no exclude', function () {
            var src = helper.getProjectSources({
                nodeProject: false,
                bowerJSON: {
                    main: 'test.js'
                }
            }, false);

            assert.deepEqual(src, [
                'test.js',
                'project/**/*.js'
            ]);
        });

        it('web, exclude', function () {
            var src = helper.getProjectSources({
                nodeProject: false,
                bowerJSON: {
                    main: 'test.js'
                }
            }, true);

            assert.deepEqual(src, [
                'test.js'
            ]);
        });
    });

    describe('getAPISources', function () {
        it('node', function () {
            var src = helper.getAPISources({
                nodeProject: true
            }, false);

            assert.equal(src, '<%=buildConfig.libDirectory%>/**/*.js');
        });

        it('web, no bower.json', function () {
            var src = helper.getAPISources({
                nodeProject: false
            }, false);

            assert.isUndefined(src);
        });

        it('web', function () {
            var src = helper.getAPISources({
                nodeProject: false,
                bowerJSON: {
                    main: 'test.js'
                }
            }, false);

            assert.equal(src, 'test.js');
        });
    });
});
