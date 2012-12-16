Ratchet.Tab = Jocks.Blocks.View.extend({
  tagName: "li",

  className: "tab-item",

  includeOptions: ["icon", "iconClass", "title", "active", "attr"],

  getDefaultOptions: function() {
    return {
      icon: null,
      iconClass: null,
      title: null,
      active: null,
      attr: {}
    };
  },

  buildComponent: function() {
    if(this.active) {
      this.$el.addClass('active');
    }
    
    var tabButton = this.tabButton = new Mobile.TabButton({
      children: children,
      attr: this.attr
    });

    if(this.icon) {
      var tabIconEl = new Mobile.TabImageIcon({
        icon: this.icon,
        attr: this.attr
      }).render().el;
      tabButton.add(tabIconEl);
    }
    if(this.iconClass) {
      var tabIconEl = new Mobile.TabAwesomeIcon({
        iconClass: this.iconClass,
        attr: this.attr
      }).render().el;
      tabButton.add(tabIconEl);
    }
    var tabLabel = new Mobile.TabLabel({
      title: this.title,
      attr: this.attr
    });
    tabButton.add(tabLabel);

    var tabButtonEl = tabButton.render().el;
    this.el.appendChild(tabButtonEl);
    
    return this;
  }
});