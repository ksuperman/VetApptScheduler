const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {
    appDistFolderPath,
    appClientStaticDistJSPath,
    appClientSrcPath,
    appStaticPublicFolderName,
    appStaticPublicFolderPath,
} = require('../../paths');

const { isProd } = require('../../../server/utils/envUtils');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
// @TODO - Make this available in the env variable and in Javascript
// const publicPath = 'https://localhost.paypal.com:4000/';

// @todo Move to the Constant File.
const excludeModulesPaths = /(node_modules|bower_components)/;

const jsFileExtensionsRegex = /\.(js|jsx)$/;

const minimizer = [];

// Add All Common Plugins to the Plugins Array.
const plugins = [
    new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
    }),
    new CopyPlugin([
        { from: path.join(appClientSrcPath, appStaticPublicFolderName), to: appStaticPublicFolderPath },
    ]),
];

if (isProd()) {
    plugins.push(
        new SWPrecacheWebpackPlugin({
            cacheId: 'my-project-name',
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            minify: true,
            // navigateFallback: PUBLIC_PATH + 'index.html',
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),
    );

    minimizer.push(
        new TerserPlugin({
            sourceMap: true, // Must be set to true if using source-maps in production
            terserOptions: {
                compress: {
                    drop_console: true,
                },
            },
        }),
    );
}

const baseConfig = {
    mode: isProd() ? 'production' : 'development',
    // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
    // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
    devtool: 'cheap-module-source-map',

    plugins,

    entry: [
        // Errors should be considered fatal in development
        // require.resolve('react-error-overlay'),
        path.join(appClientSrcPath, 'index.js'),
        // './src/partner.js',
    ],

    module: {
        rules: [
            {
                test: jsFileExtensionsRegex,
                exclude: excludeModulesPaths,
                use: ['babel-loader'],
            },
            {
                test: jsFileExtensionsRegex,
                exclude: excludeModulesPaths,
                use: ['babel-loader', 'eslint-loader'],
            },
        ],
    },

    output: {
        library: 'VetApptManagement',
        // Next line is not used in dev but WebpackDevServer crashes without it:
        path: appDistFolderPath,
        // This does not produce a real file. It's just the virtual path that is
        // served by WebpackDevServer in development. This is the JS bundle
        // containing code from all our entry points, and the Webpack runtime.
        filename: path.join(appClientStaticDistJSPath, 'core.js'),
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: path.join(appClientStaticDistJSPath, '[name].[contenthash].chunk.js'),
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true,
        // This is the URL that app is served from. We use "/" in development.
        // publicPath,
        // Point sourcemap entries to original disk location
        devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
    },

    optimization: {
        // @TODO - Disable this in Prod
        namedChunks: true,
        chunkIds: 'named',
        // @TODO - Check if the split chunks optimization is needed.
        // splitChunks: {
        //     name: true,
        // },
        splitChunks: {
            name: true,
            cacheGroups: {
                react: {
                    chunks: 'all',
                    name: 'react',
                    test: /[\\/]node_modules[\\/](react|react-dom|cxs)[\\/]/,
                    enforce: true,
                },
                reactFinalForm: {
                    chunks: 'all',
                    name: 'react-final-form',
                    test: /react-final-form/,
                    enforce: true,
                },
            },
        },
        // runtimeChunk: true,
        minimizer,
    },
};

module.exports = [
    { ...baseConfig },
    /* {
        ...baseConfig,
        resolve: {
            alias: {
                react: 'preact-compat',
                'react-dom': 'preact-compat',
            },
        },
    } */
];
