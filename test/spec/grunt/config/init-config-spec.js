'use strict';

const path = require('path');
const chai = require('chai');
const assert = chai.assert;
const initConfig = require('../../../../lib/grunt/config/init-config');

describe('Grunt initConfig Tests', function () {
    it('no project root', function () {
        let errorFound = false;
        try {
            initConfig({}, {
                buildConfig: {
                    nodeProject: true
                }
            });
        } catch (error) {
            errorFound = true;
            assert.equal(error.message, 'Property: options.buildConfig.projectRoot missing');
        }

        assert.isTrue(errorFound);
    });

    it('no node/web project defined', function () {
        let errorFound = false;
        try {
            initConfig({}, {
                buildConfig: {
                    projectRoot: path.join(__dirname, '../../../..')
                }
            });
        } catch (error) {
            errorFound = true;
            assert.equal(error.message, 'Property: options.buildConfig.nodeProject missing');
        }

        assert.isTrue(errorFound);
    });

    it('node, no project config', function () {
        let validated = false;
        const gruntMock = {
            registerTask() {
                return undefined;
            },
            registerMultiTask() {
                return undefined;
            },
            file: {
                readJSON() {
                    return {};
                }
            },
            loadNpmTasks() {
                return undefined;
            },
            initConfig(config) {
                assert.isDefined(config);
                assert.deepEqual(config.testConfig, {
                    test: true,
                    value: 1000
                });

                assert.isDefined(config.clean);
                assert.isDefined(config.mocha_istanbul);
                assert.isUndefined(config.myProj);

                validated = true;
            }
        };

        delete global.gruntConfig;

        initConfig(gruntMock, {
            buildConfig: {
                disableGruntPlugins: true,
                projectRoot: path.join(__dirname, '../../../..'),
                nodeProject: true
            },
            testConfig: {
                test: true,
                value: 1000
            }
        });

        assert.isTrue(validated);

        assert.isDefined(global.gruntConfig.apidoc2readme);
    });

    it('node, with project config', function () {
        let validated = false;
        const gruntMock = {
            registerTask() {
                return undefined;
            },
            registerMultiTask() {
                return undefined;
            },
            file: {
                readJSON() {
                    return {};
                }
            },
            loadNpmTasks() {
                return undefined;
            },
            initConfig(config) {
                assert.isDefined(config);
                assert.deepEqual(config.testConfig, {
                    test: true,
                    value: 1000
                });

                assert.isDefined(config.clean);
                assert.isDefined(config.mocha_istanbul);
                assert.isDefined(config.myProj);

                validated = true;
            }
        };

        initConfig(gruntMock, {
            buildConfig: {
                disableGruntPlugins: true,
                projectRoot: path.join(__dirname, '../../../..'),
                nodeProject: true
            },
            testConfig: {
                test: true,
                value: 1000
            }
        }, {
            tasks: {
                myProj: true
            }
        });

        assert.isTrue(validated);
    });

    it('web, no project config', function () {
        let validated = false;
        const gruntMock = {
            registerTask() {
                return undefined;
            },
            registerMultiTask() {
                return undefined;
            },
            file: {
                readJSON() {
                    return {};
                }
            },
            loadNpmTasks() {
                return undefined;
            },
            initConfig(config) {
                assert.isDefined(config);
                assert.deepEqual(config.testConfig, {
                    test: true,
                    value: 1000
                });

                assert.isDefined(config.clean);
                assert.isDefined(config.karma);
                assert.isUndefined(config.myProj);

                validated = true;
            }
        };

        delete global.gruntConfig;

        initConfig(gruntMock, {
            buildConfig: {
                disableGruntPlugins: true,
                projectRoot: path.join(__dirname, '../../../..'),
                nodeProject: false
            },
            testConfig: {
                test: true,
                value: 1000
            }
        });

        assert.isTrue(validated);

        assert.isDefined(global.gruntConfig.apidoc2readme);
    });

    it('web, with project config', function () {
        let validated = false;
        const gruntMock = {
            registerTask() {
                return undefined;
            },
            registerMultiTask() {
                return undefined;
            },
            loadNpmTasks() {
                return undefined;
            },
            file: {
                readJSON() {
                    return {};
                }
            },
            initConfig(config) {
                assert.isDefined(config);
                assert.deepEqual(config.testConfig, {
                    test: true,
                    value: 1000
                });

                assert.isDefined(config.clean);
                assert.isDefined(config.karma);
                assert.isDefined(config.myProj);

                validated = true;
            }
        };

        initConfig(gruntMock, {
            buildConfig: {
                disableGruntPlugins: true,
                projectRoot: path.join(__dirname, '../../../..'),
                nodeProject: false
            },
            testConfig: {
                test: true,
                value: 1000
            }
        }, {
            tasks: {
                myProj: true
            }
        });

        assert.isTrue(validated);
    });

    it('web, with main', function () {
        let validated = false;
        const gruntMock = {
            registerTask() {
                return undefined;
            },
            registerMultiTask() {
                return undefined;
            },
            loadNpmTasks() {
                return undefined;
            },
            file: {
                readJSON() {
                    return {};
                }
            },
            initConfig(config) {
                assert.isDefined(config);
                assert.deepEqual(config.buildConfig.packageJSON, {
                    repository: {
                        type: 'git',
                        url: 'http://github.com/sagiegurari/js-project-commons.git'
                    },
                    test: true,
                    main: 'main.js'
                });
                assert.strictEqual(config.buildConfig.packageJSON.main, 'main.js');

                assert.isDefined(config.clean);
                assert.isDefined(config.karma);
                assert.isUndefined(config.myProj);

                validated = true;
            }
        };

        initConfig(gruntMock, {
            buildConfig: {
                disableGruntPlugins: true,
                projectRoot: path.join(__dirname, '../../../helper'),
                nodeProject: false
            }
        });

        assert.isTrue(validated);
    });

    it('dual, no project config', function () {
        let validated = false;
        const gruntMock = {
            registerTask() {
                return undefined;
            },
            registerMultiTask() {
                return undefined;
            },
            file: {
                readJSON() {
                    return {};
                }
            },
            loadNpmTasks() {
                return undefined;
            },
            initConfig(config) {
                assert.isDefined(config);
                assert.deepEqual(config.testConfig, {
                    test: true,
                    value: 1000
                });

                assert.isDefined(config.clean);
                assert.isDefined(config.mocha_istanbul);
                assert.isDefined(config.karma);
                assert.isUndefined(config.myProj);

                validated = true;
            }
        };

        delete global.gruntConfig;

        initConfig(gruntMock, {
            buildConfig: {
                disableGruntPlugins: true,
                projectRoot: path.join(__dirname, '../../../..'),
                nodeProject: false,
                dualProject: true
            },
            testConfig: {
                test: true,
                value: 1000
            }
        });

        assert.isTrue(validated);

        assert.isDefined(global.gruntConfig.apidoc2readme);
    });

    it('es6 option defined', function () {
        let validated = false;
        const gruntMock = {
            registerTask() {
                return undefined;
            },
            registerMultiTask() {
                return undefined;
            },
            file: {
                readJSON() {
                    return {};
                }
            },
            loadNpmTasks() {
                return undefined;
            },
            initConfig(config) {
                assert.isDefined(config);
                assert.deepEqual(config.testConfig, {
                    test: true,
                    value: 1000
                });
                assert.strictEqual(config.buildConfig.es6Support, 700);

                assert.isDefined(config.clean);
                assert.isDefined(config.mocha_istanbul);
                assert.isDefined(config.myProj);

                validated = true;
            }
        };

        initConfig(gruntMock, {
            buildConfig: {
                disableGruntPlugins: true,
                projectRoot: path.join(__dirname, '../../../..'),
                nodeProject: true,
                es6Support: 700
            },
            testConfig: {
                test: true,
                value: 1000
            }
        }, {
            tasks: {
                myProj: true
            }
        });

        assert.isTrue(validated);
    });
});
