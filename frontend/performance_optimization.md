# Performance Optimization

### 1. Lazy Loading Images:

You can use native browser support for lazy loading images by adding the `loading="lazy"` attribute. Additionally, libraries like `react-lazyload` or `react-intersection-observer` provide a more customizable way to lazy-load images.

#### Example: Using Native Lazy Loading for Images

In your `BookList.js`, you can add the `loading="lazy"` attribute to the `img` tag for native lazy loading:

```jsx
<img
  src={book.coverImage}
  alt={book.title}
  style={{ width: "100%" }}
  loading="lazy"
/>
```

### 2. Minimizing CSS and JS Assets with Webpack:

To bundle and optimize your assets (CSS, JS), you need to ensure your build process is set up correctly using Webpack or another bundler.

#### Webpack Setup for Production:

- **Install Webpack and Plugins**: Make sure you have Webpack and related plugins installed:

```bash
npm install --save-dev webpack webpack-cli webpack-merge css-minimizer-webpack-plugin terser-webpack-plugin mini-css-extract-plugin
```

#### Webpack Configuration:

Update your `webpack.config.js` to handle production optimizations like minimizing CSS, JS, and enabling code-splitting for lazy-loaded components.

```js
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(), // For JS minification
      new CssMinimizerPlugin(), // For CSS minification
    ],
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  mode: "production",
};
```

- **MiniCssExtractPlugin**: Extracts CSS into separate files instead of inline styles, which helps in minimizing and caching.
- **CssMinimizerPlugin**: Minimizes CSS files.
- **TerserPlugin**: Minimizes JavaScript.

#### Run the Build:

Finally, build your project for production:

```bash
npm run build
```
