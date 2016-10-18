require('babel-polyfill');


const environment = {
    development: {
        isProduction: false
    },
    production: {
        isProduction: true
    }
}[process.env.NODE_ENV || 'development'];


module.exports = Object.assign({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT,
    app: {
        title: 'React Redux Universal django example',
        description: 'This is an expiremental projct',
        head: {
            titleTemplate: 'React Redux Example: %s',
            meta: [
                {name: 'description', content: ''},

            ]
        }
    },

}, environment);
