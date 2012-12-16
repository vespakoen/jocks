Ratchet.TabImageIcon = Jocks.Blocks.View.extend({
  tagName: "img",

  className: "tab-icon",

  includeOptions: ["attr", "icon"],

  getDefaultOptions: function() {
    return {
      attr: {},
      icon: ""
    };
  },

  buildComponent: function() {
    if(this.src) {
      this.attr.src = this.src;
    }
    this.$el.attr(this.attr);
  }
});