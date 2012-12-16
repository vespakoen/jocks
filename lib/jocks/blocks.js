// Ratchet
define([
  // Jocks.
  "jocks"
],

// Map dependencies from above array.
function(Jocks) {

  var Blocks = {};

  // Jocks.Blocks.ParentView
  // ---------------------
  
  // The base componenet is simply a backbone view
  // with an add method and a children array attribute
  // to add child views that will be rendered and
  // attachted to the element when render() is called
  // It also provides a buildcomponent method in which
  // the element is built before rendering
  Blocks.ParentView = Backbone.Marionette.ItemView.extend({
    _configure: Jocks.Methods._configure,
  
    constructor: Jocks.Methods.constructor(Backbone.Marionette.ItemView),
  
    includeOptions: ["id", "children"],
  
    getDefaultOptions: function() {
      return {
        children: [],
        elements: {}
      };
    },
  
    add: function(child) {
      this.children.push(child);
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
    },
  
    render: function() {
      // Trigger before:render event
      this.trigger("before:render");
  
      // Render children
      _.each(this.children, function(child) {
        this.elements.childContainer.appendChild(child.render().el);
      }, this);
      
      // Trigger render event
      this.trigger("render");
      return this;
    }
  });

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

  // Jocks.Blocks.CompositeView
  // ---------------------
  
  // The CompositeView is an extension of Marionette's
  // CompositeView with a small modification.
  // This modification adds the beforeConstructor
  // and afterInitialize methods to our view and
  // adds the possibility to define what options
  // should be added to the instance of the view
  Blocks.CompositeView = Backbone.Marionette.CompositeView.extend({
    includeOptions: ["id"],
  
    _configure: Jocks.Methods._configure,
  
    constructor: Jocks.Methods.constructor(Backbone.Marionette.CompositeView),
  
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

  // Jocks.Blocks.Layout
  // ---------------------
  
  // The Layout is an extension of Marionette's
  // Layout with a small modification.
  // This modification adds the beforeConstructor
  // and afterInitialize methods to our view and
  // adds the possibility to define what options
  // should be added to the instance of the view
  Blocks.Layout = Backbone.Marionette.Layout.extend({
    includeOptions: ["id"],
  
    _configure: Jocks.Methods._configure,
  
    constructor: Jocks.Methods.constructor(Backbone.Marionette.Layout),
  
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

  // Jocks.Blocks.View
  // ---------------------
  
  // The View is an extension of Marionette's
  // View with a small modification.
  // This modification adds the beforeConstructor
  // and afterInitialize methods to our view and
  // adds the possibility to define what options
  // should be added to the instance of the view
  Blocks.View = Backbone.Marionette.View.extend({
    includeOptions: ["id"],
  
    _configure: Jocks.Methods._configure,
  
    constructor: Jocks.Methods.constructor(Backbone.Marionette.View),
  
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
    },
  
    render: function() {
    	// Provide some consistency
    	this.triggerMethod("before:render", this);
    	this.triggerMethod("render", this);
    	return this;
    }
  });

  Jocks.Blocks = Blocks;

  // Return the module for AMD compliance.
  return Blocks;

});