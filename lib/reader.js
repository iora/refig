(function(fs, path){
  var Reader = function(options, parser){
    if (!(this instanceof Reader)) return new Reader(options);
    this.options = (typeof options === 'object') ? options : {};
    this.parser = (typeof parser !== 'undefined') ? parser : {};
    return this;
  };

  Reader.prototype.use = function(override){
    if (typeof override === 'object') {
      this.options = override;
    }
    return this;
  };

  Reader.prototype.read = function(filepath, async){
    return (function(options, parser){
      var isAsync = true;
      if (typeof options.async !== 'undefined') isAsync = options.async;

      var base = '';
      if (typeof options.base !== 'undefined') base = options.base;

      filepath = (function(){
        if (!path.isAbsolute(filepath)) {
          return path.normalize(base + '/' + filepath);
        } else {
          return filepath;
        }
      })();

      if (isAsync) {
        fs.readFile(filepath, function(err, data){
          async(err, data ? parser.parse(data) : data);
        });
      } else {
        return parser.parse(fs.readFileSync(filepath));
      }
    })(
      this.options,
      this.parser
    );
  };

  module.exports = exports = Reader;
})(
  require('fs'),
  require('path')
);
