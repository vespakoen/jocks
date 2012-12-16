// Blocks.Layout
// ---------------------

// The Layout is an extension of Marionette's
// Layout with a small modification.
// This modification adds the beforeConstructor
// and afterInitialize methods to our view and
// adds the possibility to define what options
// should be added to the instance of the view
Blocks.Layout = Backbone.Marionette.Layout.extend({
  includeOptions: ["id"],

  _configure: _configure,

  constructor: constructor(Backbone.Marionette.Layout)
});