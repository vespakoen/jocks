Ratchet.SecondaryBar = Jocks.Blocks.ParentView.extend({
  className: "bar-header-secondary",

  includeOptions: ["style", "children"],

  getDefaultOptions: function() {
    return {
      children: [],
      style: "standard",
      elements: {}
    };
  },

  buildComponent: function() {
    this.$el.addClass("bar-" + this.style);

    this.addElement("childContainer", this.el);
  },

  setStyle: function(style) {
    $(this.el)
      .removeClass("bar-standard bar-title")
      .addClass("bar-" + style);
  }
});