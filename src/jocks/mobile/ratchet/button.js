Ratchet.Button = Jocks.Blocks.View.extend({
  tagName: "a",

  includeOptions: ["icon", "title", "attr", "active"],

  getDefaultOptions: function() {
    return {
      icon: null,
      title: "",
      active: false,
      attr: {
        "class": "button"
      }
    };
  },

  buildComponent: function() {
    this.$el.attr(this.attr);
    this.$el.html(this.title);
    if(this.icon) {
      var iconEl = this.icon.render().el;
      this.$el.prepend(iconEl);
    }
  }
});