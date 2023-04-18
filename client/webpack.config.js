// Import required modules
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Export configuration object for Webpack
module.exports = () => {
	return {
		// Set development mode
		mode: 'development',
		// Define entry points for JavaScript files
		entry: {
			main: './src/js/index.js',
			install: './src/js/install.js',
		},
		// Define output file names and path
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
		},
		// Define plugins to use
		plugins: [
			// Generate an HTML file
			new HtmlWebpackPlugin({
				template: './index.html',
				title: 'J.A.T.E',
			}),
			// Add a service worker
			new InjectManifest({
				swSrc: './src-sw.js',
				swDest: 'src-sw.js',
			}),
			// Generate a PWA manifest file
			new WebpackPwaManifest({
				fingerprints: false,
				inject: true,
				name: 'Just Another Text Editor',
				short_name: 'J.A.T.E',
				description: 'Takes notes with JavaScript syntax highlighting!',
				background_color: '#225ca3',
				theme_color: '#225ca3',
				start_url: '/',
				publicPath: '/',
				icons: [
					{
						src: path.resolve('src/images/logo.png'),
						sizes: [96, 128, 192, 256, 384, 512],
						destination: path.join('assets', 'icons'),
					},
				],
			}),
		],
		// Define rules for handling CSS and JavaScript files
		module: {
			rules: [
				// Handle CSS files
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
				// Handle JavaScript files using Babel
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
						},
					},
				},
			],
		},
	};
};