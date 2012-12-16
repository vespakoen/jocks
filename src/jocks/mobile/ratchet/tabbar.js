Ratchet.TabBar = Jocks.Blocks.ParentView.extend({
  tagName: "nav",

  className: "bar-tab",

  getDefaultOptions: function() {
    return {
      elements: {}
    };
  },

  buildComponent: function() {
    this.makeElement("childContainer", "ul", {
      "class": "tab-inner"
    });
  }
});