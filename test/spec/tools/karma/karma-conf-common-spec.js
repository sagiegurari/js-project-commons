'use strict';

const chai = require('chai');
const assert = chai.assert;
const karmaConf = require('../../../../lib/tools/karma/karma-conf-common');

describe('KarmaConf Tests', function () {
    const createMockConfig = function () {
        return {
            set(value) {
                this.value = value;
            }
        };
    };

    const setEnv = function (name, value) {
        const output = process.env[name];

        if (value) {
            process.env[name] = value;
        } else {
            delete process.env[name];
        }

        return output;
    };

    it('no project config, not CI', function () {
        const config = createMockConfig();
        const env = setEnv('CI');

        karmaConf(config, null, 'test');

        setEnv('CI', env);
        const output = config.value;

        assert.strictEqual(output.browsers.length, 1);
        assert.strictEqual(output.browsers[0], 'ChromiumHeadless');
    });

    it('no project config, CI', function () {
        const config = createMockConfig();
        const env = setEnv('CI', 'true');

        karmaConf(config, null, 'test');

        setEnv('CI', env);
        const output = config.value;

        assert.strictEqual(output.browsers.length, 1);
        assert.strictEqual(output.browsers[0], 'ChromeHeadlessCI');
    });

    it('project config, not CI', function () {
        const config = createMockConfig();
        const env = setEnv('CI');

        karmaConf(config, {
            test: 'fake value'
        }, 'test');

        setEnv('CI', env);
        const output = config.value;

        assert.strictEqual(output.browsers.length, 1);
        assert.strictEqual(output.browsers[0], 'ChromiumHeadless');
        assert.strictEqual(output.test, 'fake value');
    });

    it('project config, CI', function () {
        const config = createMockConfig();
        const env = setEnv('CI', 'true');

        karmaConf(config, {
            test: 'fake value'
        }, 'test');

        setEnv('CI', env);
        const output = config.value;

        assert.strictEqual(output.browsers.length, 1);
        assert.strictEqual(output.browsers[0], 'ChromeHeadlessCI');
        assert.strictEqual(output.test, 'fake value');
    });
});
