Ratchet.SegmentedControllerItem = Jocks.Blocks.View.extend({
  tagName: "li",

  className: "item",
  
  includeOptions: ["attr", "active", "child"],

  getDefaultOptions: function() {
    return {
      attr: {},
      active: false,
      child: null
    };
  },

  buildComponent: function() {
    this.$el.attr(this.attr);

    if(this.active) {
      this.$el.addClass("active");
    }
  },

  activate: function() {
    this.$el.addClass("active");
  },

  deactivate: function() {
    this.$el.removeClass("active");
  },

  render: function() {
    // Render the child
    var childEl = this.child.render().el;

    // Add the "item" class to the child
    $(childEl).addClass("item");

    // Append the child
    this.el.appendChild(childEl);
    return this;
  }
});