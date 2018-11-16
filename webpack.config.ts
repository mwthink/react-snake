import { Configuration } from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as Path from 'path';

const SRC_DIR = Path.resolve(__dirname,'src');
const OUT_DIR = Path.resolve(__dirname,'docs');

export const config: Configuration = {
  mode: 'development',
  entry: [
    Path.resolve(SRC_DIR,'browser.tsx'),
  ],
  output: {
    path: OUT_DIR,
    filename: 'js/[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js','.jsx','.ts','.tsx'],
    alias: {},
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{loader:'ts-loader'}],
      },
    ],
  },
  devServer: {
    contentBase: OUT_DIR,
    historyApiFallback: true,
    compress: true,
    port: 3000,
    proxy: {},
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Snake',
      hash: true
    }),
  ],
};

export default config;
