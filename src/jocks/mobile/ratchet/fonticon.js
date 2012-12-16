Ratchet.FontIcon = Jocks.Blocks.View.extend({
  tagName: "i",

  className: "icon",

  includeOptions: ["icon", "white", "large"],

  getDefaultOptions: function() {
    return {
      icon: "",
      white: true,
      large: true
    };
  },

  buildComponent: function() {
    if(this.white) {
      this.$el.addClass("icon-white");
    }
    if(this.large) {
      this.$el.addClass("icon-large");
    }
    this.$el.addClass("icon-" + this.icon);
  }
});