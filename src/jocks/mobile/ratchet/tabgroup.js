Ratchet.TabGroup = Jocks.Blocks.ParentView.extend({
  className: "tab-group",

  includeOptions: ["children", "activeTab"],

  getDefaultOptions: function() {
    return {
      children: [],
      activeTab: 0,
      preloadTabs: true,
      elements: {}
    };
  },

  render: function() {
    // Trigger before:render event
    this.trigger("before:render");

    // Clean the view
    while (this.elements.childContainer.hasChildNodes()) {
      this.elements.childContainer.removeChild(this.elements.childContainer.firstChild);
    }

    // Render children
    _.each(this.children, function(child, i) {
      var tabEl = this.make('div', {
        "class": "tab" + (i == this.activeTab) ? " active" : ""
      });
      this.elements.childContainer.appendChild(tabEl);

      var tabRegion = new Backbone.Marionette.Region({
        el: tabEl
      });

      // Instantiate a new region for the tab
      this.tabs.push(tabRegion);

      if(this.preloadTabs || this.activeTab == i) {
        tabRegion.show(child);
      }
    }, this);
    
    // Trigger render event
    this.trigger("render");
    return this;
  },

  getActiveTabIndex: function(idOrTabOrIndex) {
    for(var i in this.children) {
      var tab = this.children[i];

      if(
          // Check for id match (string)
          (typeof idOrTabOrIndex == "string" && tab.id == idOrTabOrIndex)
        ||
          // Check for tab match (Backbone view's CID)
          (idOrTabOrIndex.cid && idOrTabOrIndex.cid == tab.cid)
        ||
          // Check for index match (integer)
          (idOrTabOrIndex == i)
      ) {
        return i;
      }
    }

    // No tab found? Make the first one active
    return 0;    
  },

  setActiveTab: function(idOrTabOrIndex) {
    var activeTabIndex = this.activeTab = this.getActiveTabIndex(idOrTabOrIndex);
    var activeTab = this.children[activeTabIndex];
    
    // Remove the "active" class from all tabs
    this.$el.children()
      .removeClass('active');

    // Add the "active" class to the new tab
    this.$el.children('.tab')
      .eq(activeTabIndex)
      .addClass('active');

    if( ! this.preloadTabs) {
      // Show the new content
      this.tabs[activeTabIndex].show(activeTab);
    }
    
    activeTab.triggerMethod("tab:show", activeTab);
    _.each(this.children, function(child, i) {
      if(i !== activeTabIndex) {
        child.triggerMethod("tab:hide", child);
      }
    });
  }
});