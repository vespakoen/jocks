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