require('babel-register');
var config = require('../../config/index.js');


module.exports = {
    "src_folders": ["frontend/test/e2e/specs"],
    "output_folder": "frontend/test/e2e/reports",
    "custom_assertions_path": ["frontend/test/e2e/custom-assertions"],

    "selenium": {
        "start_process": true,
        "server_path": "node_modules/selenium-server/lib/runner/selenium-server-standalone-3.0.1.jar",
        "host": "127.0.0.1",
        "port": 4444,
        "cli_args": {
            "webdriver.chrome.driver": require('chromedriver').path
        }
    },

    "test_settings": {
        "default": {
            "selenium_port": 4444,
            "selenium_host": "localhost",
            "silent": true,
            "globals": {
                "devServerURL": "http://localhost:" + (process.env.PORT || config.dev.port)
            }
        },

        "chrome": {
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true,
                "acceptSslCerts": true
            }
        },

        "firefox": {
            "desiredCapabilities": {
                "browserName": "firefox",
                "javascriptEnabled": true,
                "acceptSslCerts": true
            }
        }
    }
}
