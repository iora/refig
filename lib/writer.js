(function(fs, path){
  var Writer = function(options){
    if (!(this instanceof Writer)) return new Writer(options);
    this.options = (typeof options === 'object') ? options : {};
    return this;
  };

  Writer.prototype.use = function(override){
    if (typeof override === 'object') {
      this.options = override;
    }
    return this;
  };

  Writer.prototype.write = function(filename, async){
    return (function(options){
      if (options.example) {
        console.log('Yey!')
      }
    })(this.options);
  };

  module.exports = exports = Writer;
})(
  require('fs'),
  require('path')
);
