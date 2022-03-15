/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module = {
  noParse: /node_modules\/quill/
}

// module = {
//   noParse: /node_modules\/quill/,
//   loaders: [{
//     loader: 'url-loader?limit=100000',
//     test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/
//   }, {
//   exclude: /node_modules/,
