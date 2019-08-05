const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    appDistFolderPath,
    appClientStaticDistJSName,
    appClientPath,
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
        { from: path.join(appClientPath, appStaticPublicFolderName), to: appStaticPublicFolderPath },
    ]),
    new SWPrecacheWebpackPlugin({
        cacheId: 'my-project-name',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: path.join(appStaticPublicFolderName, 'service-worker.js'),
        minify: true,
        // navigateFallback: PUBLIC_PATH + 'index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    new WebpackAssetsManifest({
        writeToDisk: true,
        output: path.join(appStaticPublicFolderPath, 'manifest.json'),
    }),
    // new MiniCssExtractPlugin({
    //     // Options similar to the same options in webpackOptions.output
    //     // all options are optional
    //     filename: '[name].[id].[contenthash].css',
    //     chunkFilename: '[name].[id].[contenthash].css',
    //     ignoreOrder: false, // Enable to remove warnings about conflicting order
    // }),
];

if (isProd()) {
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
            {
                test: /\.css/,
                use: [
                    // {
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options: {
                    //         // you can specify a publicPath here
                    //         // by default it uses publicPath in webpackOptions.output
                    //         // publicPath: '../',
                    //         hmr: process.env.NODE_ENV === 'development',
                    //     },
                    // },
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: { modules: true },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: `${__dirname}/postcss.config.js`,
                            },
                        },
                    },
                ],
                include: appClientSrcPath,
            },
        ],
    },

    output: {
        // library: 'VetApptManagement',
        // Next line is not used in dev but WebpackDevServer crashes without it:
        path: appDistFolderPath,
        // This does not produce a real file. It's just the virtual path that is
        // served by WebpackDevServer in development. This is the JS bundle
        // containing code from all our entry points, and the Webpack runtime.
        filename: path.join(appClientStaticDistJSName, 'core.js'),
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: path.join(appClientStaticDistJSName, '[name].[contenthash].chunk.js'),
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true,
        // This is the URL that app is served from. We use "/" in development.
        // publicPath,
        // Point sourcemap entries to original disk location
        devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
    },

    optimization: {
        splitChunks: {
            name: true,
            cacheGroups: {
                react: {
                    chunks: 'all',
                    name: 'react',
                    test: /[\\/]node_modules[\\/](react|react-dom|redux|cxs)[\\/]/,
                    enforce: true,
                },
            },
        },
        // runtimeChunk: 'single',
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
