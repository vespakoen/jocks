Ratchet.Header = Jocks.Blocks.View.extend({
  includeOptions: ["backButton", "backButtonTitle", "title", "titleBar", "titleBarChildren", "secondaryBar", "secondaryBarChildren"],

  getDefaultOptions: function() {
    return {
      backButton: null,
      backButtonTitle: null,
      title: "",
      titleBar: null,
      titleBarChildren: [],
      secondaryBar: null,
      secondaryBarChildren: [],
      elements: {}
    };
  },

  buildComponent: function() {
    if( ! this.titleBar) {
      this.titleBar = new Ratchet.TitleBar({
        backButton: this.backButton,
        backButtonTitle: this.backButtonTitle,
        title: this.title,
        children: this.titleBarChildren
      });
    }

    if( ! this.secondaryBar) {
      this.secondaryBar = new Ratchet.SecondaryBar();
    }
  },

  addTitleBarChild: function(child) {
    this.titleBar.add(child);
  },

  addSecondaryBarChild: function(child) {
    this.secondaryBarChildren.push(child);
  },

  render: function() {
    // Trigger before:render event
    this.trigger("before:render");

    var titleBarEl = this.titleBar.render().el;
    this.addElement("titleBarContainer", titleBarEl);
    this.el.appendChild(titleBarEl);
    
    var secondaryBarEl = this.secondaryBar.render().el;
    this.addElement("secondaryBarContainer", secondaryBarEl);
    this.el.appendChild(secondaryBarEl);

    // Render secondarybar children
    _.each(this.secondaryBarChildren, function(child) {
      this.elements.secondaryBarContainer.appendChild(child.render().el);
    }, this);    
    
    // Trigger render event
    this.trigger("render");
    return this;
  }
});