(function(fs, path){
  var Parser = function(options){
    if (!(this instanceof Parser)) return new Parser(options);
    this.options = (typeof options === 'object') ? options : {};
    return this;
  };

  Parser.prototype.use = function(override){
    if (typeof override === 'object') {
      this.options = override;
    }
    return this;
  };

  Parser.prototype.read = function(filename, async){
    return (function(options){

    })(this.options);
  };

  module.exports = exports = Parser;
})(
  require('fs'),
  require('path')
);
