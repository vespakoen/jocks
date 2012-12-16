// Jocks
define([], function() {

  var Jocks = {
  	Mobile: {},
  	Web: {},
  	Maps: {},
  	Methods: {},
  	Blocks: {}
  };

  Jocks.Methods.constructor = function(parent) {
    return function() {
      if(typeof this.beforeConstructor !== "undefined") {
        this.beforeConstructor();
      }
  
      parent.prototype.constructor.apply(this, arguments);
  
      if(typeof this.afterInitialize !== "undefined") {
        this.afterInitialize();
      }
    };
  }
  
  Jocks.Methods._configure = function(options) {
    // Make sure the stuff we are going to combine are at least an empty object
    var defaultOptions = this.getDefaultOptions ? this.getDefaultOptions() : {};
    this.options = this.options || {};
    options = options || {};
  
    // Combine the options
    this.options = options = $.extend(true, defaultOptions, this.options, options);
  
    _.each(options, function(value, key) {
      var includeOptions = this.includeOptions || [];
      includeOptions = _.union(includeOptions.concat('model', 'collection'), _.keys(defaultOptions));
      if(_.contains(includeOptions, key)) {
        this[key] = value;
      }
    }, this);
  }

  // Return the module for AMD compliance.
  return Jocks;

});