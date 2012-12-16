Ratchet.TabLabel = Jocks.Blocks.View.extend({
  className: "tab-label",

  includeOptions: ["attr", "title"],

  getDefaultOptions: function() {
    return {
      attr: {},
      title: ""
    };
  },

  buildComponent: function() {
    this.$el.attr(this.attr);
    this.$el.html(this.title);
  }
});