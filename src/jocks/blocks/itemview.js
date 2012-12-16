// Jocks.Blocks.ItemView
// ---------------------

// The ItemView is an extension of Marionette's
// ItemView with a small modification.
// This modification adds the beforeConstructor
// and afterInitialize methods to our view and
// adds the possibility to define what options
// should be added to the instance of the view
Blocks.ItemView = Backbone.Marionette.ItemView.extend({
  includeOptions: ["id"],

  _configure: Jocks.Methods._configure,

  constructor: Jocks.Methods.constructor(Backbone.Marionette.ItemView),

  getDefaultOptions: function() {
    return {
      elements: {}
    };
  },

  afterInitialize: function() {
    this.buildComponent();
  },

  makeElement: function(name, tagName, attributes, content) {
    var el = this.elements[name] = this.make(tagName, attributes, content);
    return el;
  },

  addElement: function(name, element) {
    this.elements[name] = element;
    return element;
  },

  buildComponent: function() {
    this.addElement('childContainer', this.el);
  }
});