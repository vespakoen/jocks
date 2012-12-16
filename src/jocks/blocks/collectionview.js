// Jocks.Blocks.CollectionView
// ---------------------

// The CollectionView is an extension of Marionette's
// CollectionView with a small modification.
// This modification adds the beforeConstructor
// and afterInitialize methods to our view and
// adds the possibility to define what options
// should be added to the instance of the view
Blocks.CollectionView = Backbone.Marionette.CollectionView.extend({
  includeOptions: ["id"],

  _configure: Jocks.Methods._configure,

  constructor: Jocks.Methods.constructor(Backbone.Marionette.CollectionView),

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