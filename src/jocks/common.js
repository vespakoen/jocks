function constructor(parent) {
  return function() {
    if(typeof this.beforeConstructor !== "undefined") {
      this.beforeConstructor();
    }

    parent.prototype.constructor.apply(this, arguments);

    if(typeof this.afterConstuctor !== "undefined") {
      this.afterConstuctor();
    }
  };
}

function _configure(options) {
  // Make sure the stuff we are going to combine are at least an empty object
  var defaultOptions = this.getDefaultOptions ? this.getDefaultOptions() : {};
  this.options = this.options || {};
  options = options || {};

  // Combine the options
  this.options = options = $.extend(true, defaultOptions, this.options, options);

  _.each(options, function(value, key) {
    var includeOptions = this.includeOptions || [];
    includeOptions = includeOptions.concat('model', 'collection');
    if(_.contains(includeOptions, key)) {
      this[key] = value;
    }
  }, this);
}