//-->> Created by pipu on 2017/4/27.
function generateLoaders (loaders) {
  var sourceLoader = loaders.map(function (loader) {
    var extraParamChar
    if (/\?/.test(loader)) {
      loader = loader.replace(/\?/, '-loader?')
      extraParamChar = '&'
    } else {
      loader = loader + '-loader'
      extraParamChar = '?'
    }
    return loader;
    // return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
  }).join('!')


  return ['vue-style-loader', sourceLoader].join('!')

}
console.log(generateLoaders(['css', 'stylus']));