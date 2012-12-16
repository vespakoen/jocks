// Blocks.CollectionView
// ---------------------

// The CollectionView is an extension of Marionette's
// CollectionView with a small modification.
// This modification adds the beforeConstructor
// and afterInitialize methods to our view and
// adds the possibility to define what options
// should be added to the instance of the view
Blocks.CollectionView = Backbone.Marionette.CollectionView.extend({
  includeOptions: ["id"],

  _configure: _configure,

  constructor: constructor(Backbone.Marionette.CollectionView)
});