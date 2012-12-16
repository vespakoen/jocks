Ratchet.SegmentedController = Jocks.Blocks.ParentView.extend({
  tagName: "ul",

  className: "segmented-controller",

  includeOptions: ["children", "activeItem"],

  shims: [],

  getDefaultOptions: function() {
    return {
      children: [],
      activeItem: null,
      elements: {}
    };
  },

  afterInitialize: function() {
    this.buildComponent();
    this.bindTo(this, "after:render", this.activateActiveTab, this);
  },

  activateActiveItem: function() {
    if(this.activeItem) {
      this.setActiveItem(this.activeItem);
    }
  },

  setActiveItem: function(index) {
    _.each(this.shims, function(shim, i) {
      shim.$el.removeClass('active');
      if(index == i) {
        shim.$el.addClass('active');
      }
    });
  },

  render: function() {
    // Trigger before:render event
    this.trigger("before:render");

    // Clean the view
    while (this.elements.childContainer.hasChildNodes()) {
      this.elements.childContainer.removeChild(this.elements.childContainer.firstChild);
    }

    // Clean up the shims
    _.each(this.shims, function(shim) {
      shim.close();
    });

    // Render children
    _.each(this.children, function(child) {
      child.$el.removeClass("button");
      var segmentedControllerItem = new Ratchet.SegmentedControllerItem({
        child: child
      });
      this.shims.push(segmentedControllerItem);
      segmentedControllerItemEl = segmentedControllerItem.render().el;

      this.elements.childContainer.appendChild(segmentedControllerItemEl);
    }, this);
    
    // Trigger render event
    this.trigger("render");
    return this;
  }
});