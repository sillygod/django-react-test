require('babel-polyfill');

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var assetsPath = path.resolve(__dirname, '../static/dist');  // TODO: need to fix?
var host = (process.env.HOST || 'localhost');
var port = (+process.env.PORT + 1) || 3001;

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-settings'));

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
    babelrcObject = JSON.parse(babelrc);
} catch (err) {
    console.error('==> ERROR: Error parsing your .babelrc.');
    console.error(err);
}

var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};


var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});
delete babelLoaderQuery.env;


// we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.

babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
var reactTransform = null;

for(var i=0; i<babelLoaderQuery.plugins.length; ++i){
    var plugin = babelLoaderQuery.plugins[i];

    if(Array.isArray(plugin) && plugin[0] === 'react-transform'){
        reactTransform = plugin;
    }
}

if(!reactTransform){
    reactTransform = ['react-transform', {transforms: []}];
    babelLoaderQuery.plugins.push(reactTransform);
}

if(!reactTransform[1] || !reactTransform[1].transforms){
    reactTransform[1] = Object.assign({}, reactTransform[1], {transforms: []});
}

// make sure react-transform-hmr is enabled

reactTransform[1].transforms.push({
    transform: 'react-transform-hmr',
    imports: ['react'],
    locals: ['module']
});


module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, '.'),
    entry: {
        'main': [
            'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
            './frontend/client.js'
        ]
    },
    output: {
        path: assetsPath,
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: 'http://' + host + ':' + port + '/dist/'
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?'+JSON.stringify(babelLoaderQuery), 'eslint-loader']},
            { test: /\.json$/, loader: 'json-loader' },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss-loader?sourceMap=inline"
            },

            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
        ]
    },
    progress: true,

    postcss: function(){
        return [
            require('precss')(),
            require('autoprefixer')()
        ];
    },
    resolve: {
        modulesDirectories: [
            'frontend',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/webpack-stats\.json$/),
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: true,
            __DEVTOOLS__: true
        }),
        webpackIsomorphicToolsPlugin.development()
    ]
};
