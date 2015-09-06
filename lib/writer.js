(function(fs, path){
  var Writer = function(options, parser){
    if (!(this instanceof Writer)) return new Writer(options);
    this.options = (typeof options === 'object') ? options : {};
    this.parser = (typeof parser !== 'undefined') ? parser : {};
    return this;
  };

  Writer.prototype.use = function(override){
    if (typeof override === 'object') {
      this.options = override;
    }
    return this;
  };

  Writer.prototype.write = function(filepath, data, async){
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
        fs.writeFile(filepath, parser.serialize(data, options.indent), async);
        return this;
      } else {
        return fs.writeFileSync(filepath, parser.serialize(data, options.indent));
      }
    })(
      this.options,
      this.parser
    );
  };

  var builder = {};
  Writer.prototype.build = function(key, value){
    builder[key] = value;
    return this;
  };

  Writer.prototype.writeBuild = function(filepath, async){
    return Writer.prototype.write.apply(this, [filepath, builder, function(err){
      if (!err) builder = {};
      async(err);
    }]);
  };

  module.exports = exports = Writer;
})(
  require('fs'),
  require('path')
);
