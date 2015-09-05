(function(fs, path){
  var Parser = function(options){
    this.options = (typeof options === 'object') ? options : {};
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
