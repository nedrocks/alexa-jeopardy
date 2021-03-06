var fs = require('fs'),
    path = require('path');

module.exports = {
  entry: fs.readdirSync(path.join(__dirname, './src/lambdas'))
       .filter(filename => /\.js$/.test(filename))
       .map(filename => {
         var entry = {};
         entry[filename.replace('.js', '')] = path.join(
           __dirname,
           './src/lambdas/',
           filename
         );
         return entry;
       })
       .reduce((finalObject, entry) => Object.assign(finalObject, entry), {}),
  output: {
    path: path.join(__dirname, 'dist'),
    library: '[name]',
    libraryTarget: 'commonjs2',
    filename: '[name].js'
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: JSON.parse(
          fs.readFileSync(path.join(__dirname, '.babelrc'), {encoding: 'utf8'})
        )
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
