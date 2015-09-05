(function(fs, path){
  var Reader = function(options){
    if (!(this instanceof Reader)) return new Reader(options);
    this.options = (typeof options === 'object') ? options : {};
    return this;
  };

  Reader.prototype.use = function(override){
    if (typeof override === 'object') {
      this.options = override;
    }
    return this;
  };

  Reader.prototype.read = function(filename, async){
    return (function(options){

    })(this.options);
  };

  module.exports = exports = Reader;
})(
  require('fs'),
  require('path')
);
