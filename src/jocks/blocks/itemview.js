// Blocks.ItemView
// ---------------------

// The ItemView is an extension of Marionette's
// ItemView with a small modification.
// This modification adds the beforeConstructor
// and afterInitialize methods to our view and
// adds the possibility to define what options
// should be added to the instance of the view
Blocks.ItemView = Backbone.Marionette.ItemView.extend({
  includeOptions: ["id"],

  _configure: _configure,

  constructor: constructor(Backbone.Marionette.ItemView)
});