(function(){
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

  Parser.prototype.parse = function(data){
    return (function(options){
      var parse = options.parse;
      if (!parse) throw Error('A parser was not set!');

      // Normalize input
      if (data instanceof Buffer) data = data.toString();
      if (typeof data !== 'string') throw Error('You can only parse strings or buffers!');

      return parse(data);
    })(this.options);
  };

  Parser.prototype.stringify =
  Parser.prototype.serialise =
  Parser.prototype.serialize = function(data){
    return (function(options){
      var serialize = options.serialize;
      // Normalize serialization options.
      if (!serialize) throw Error('A serializer was not set!');

      // Normalize input
      if (typeof data !== 'object') throw Error('You can only serialize objects!');

      return serialize(data, options.indent);
    })(this.options);
  };

  module.exports = exports = Parser;
})();
