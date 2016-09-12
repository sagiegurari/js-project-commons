'use strict';
/*global describe: false, it: false*/

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

    describe('getESlintTestConfigFile', function () {
        it('node', function () {
            var file = helper.getESlintTestConfigFile({
                nodeProject: true
            });

            assert.isTrue(file.indexOf('mocha') !== -1);
            assert.isTrue(file.indexOf('karma') === -1);
        });

        it('web', function () {
            var file = helper.getESlintTestConfigFile({
                nodeProject: false
            });

            assert.isTrue(file.indexOf('karma') !== -1);
            assert.isTrue(file.indexOf('mocha') === -1);
        });
    });

    describe('getProjectSources', function () {
        it('node all', function () {
            var src = helper.getProjectSources({
                nodeProject: true
            }, {
                includeLib: true,
                includeBuild: true,
                includeTest: true
            });

            assert.deepEqual(src, [
                '*.js',
                '<%=buildConfig.libDirectory%>/**/*.js',
                'project/**/*.js',
                '<%=buildConfig.testDirectory%>/**/*spec.js'
            ]);
        });

        it('node defaults', function () {
            var src = helper.getProjectSources({
                nodeProject: true
            });

            assert.deepEqual(src, [
                '*.js',
                '<%=buildConfig.libDirectory%>/**/*.js'
            ]);
        });

        it('node only lib', function () {
            var src = helper.getProjectSources({
                nodeProject: true
            }, {
                includeLib: true
            });

            assert.deepEqual(src, [
                '*.js',
                '<%=buildConfig.libDirectory%>/**/*.js'
            ]);
        });

        it('node only build', function () {
            var src = helper.getProjectSources({
                nodeProject: true
            }, {
                includeLib: false,
                includeBuild: true
            });

            assert.deepEqual(src, [
                'project/**/*.js'
            ]);
        });

        it('node only test', function () {
            var src = helper.getProjectSources({
                nodeProject: true
            }, {
                includeLib: false,
                includeTest: true
            });

            assert.deepEqual(src, [
                '<%=buildConfig.testDirectory%>/**/*spec.js'
            ]);
        });

        it('web all, no bower.json', function () {
            var src = helper.getProjectSources({
                nodeProject: false
            }, {
                includeLib: true,
                includeBuild: true,
                includeTest: true
            });

            assert.deepEqual(src, [
                'project/**/*.js',
                '<%=buildConfig.testDirectory%>/**/*spec.js'
            ]);
        });

        it('web defaults, no bower.json', function () {
            var src = helper.getProjectSources({
                nodeProject: false
            });

            assert.deepEqual(src, []);
        });

        it('web only lib, no bower.json', function () {
            var src = helper.getProjectSources({
                nodeProject: false
            }, {
                includeLib: true
            });

            assert.deepEqual(src, []);
        });

        it('web only build, no bower.json', function () {
            var src = helper.getProjectSources({
                nodeProject: false
            }, {
                includeLib: false,
                includeBuild: true
            });

            assert.deepEqual(src, [
                'project/**/*.js'
            ]);
        });

        it('web only test, no bower.json', function () {
            var src = helper.getProjectSources({
                nodeProject: false
            }, {
                includeLib: false,
                includeTest: true
            });

            assert.deepEqual(src, [
                '<%=buildConfig.testDirectory%>/**/*spec.js'
            ]);
        });

        it('web all', function () {
            var src = helper.getProjectSources({
                nodeProject: false,
                bowerJSON: {
                    main: 'test.js'
                }
            }, {
                includeLib: true,
                includeBuild: true,
                includeTest: true
            });

            assert.deepEqual(src, [
                'test.js',
                'project/**/*.js',
                '<%=buildConfig.testDirectory%>/**/*spec.js'
            ]);
        });

        it('web defaults', function () {
            var src = helper.getProjectSources({
                nodeProject: false,
                bowerJSON: {
                    main: 'test.js'
                }
            });

            assert.deepEqual(src, [
                'test.js'
            ]);
        });

        it('web only lib', function () {
            var src = helper.getProjectSources({
                nodeProject: false,
                bowerJSON: {
                    main: 'test.js'
                }
            }, {
                includeLib: true
            });

            assert.deepEqual(src, [
                'test.js'
            ]);
        });

        it('web only build', function () {
            var src = helper.getProjectSources({
                nodeProject: false,
                bowerJSON: {
                    main: 'test.js'
                }
            }, {
                includeLib: false,
                includeBuild: true
            });

            assert.deepEqual(src, [
                'project/**/*.js'
            ]);
        });

        it('web only test', function () {
            var src = helper.getProjectSources({
                nodeProject: false,
                bowerJSON: {
                    main: 'test.js'
                }
            }, {
                includeLib: false,
                includeTest: true
            });

            assert.deepEqual(src, [
                '<%=buildConfig.testDirectory%>/**/*spec.js'
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
