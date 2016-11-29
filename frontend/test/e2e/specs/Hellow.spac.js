module.exports = {
    'default e2e tests': function (browser) {
        // automatically uses dev Server port from /config.index.js
        // default: http://localhost:8080
        // see nightwatch.conf.js
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer)
            .waitForElementVisible('h1', 1000)
            .assert.elementPresent('h1')
            .assert.containsText('h1', 'test2')
            .end()
    }
}