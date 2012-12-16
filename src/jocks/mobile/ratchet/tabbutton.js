Ratchet.TabButton = Jocks.Blocks.ParentView.extend({
  includeOptions: ["children", "attr"],

  getDefaultOptions: function() {
    return {
      children: [],
      attr: {},
      elements: {}
    };
  },

  buildComponent: function() {
    this.makeElement("childContainer", "a", this.attr);
  }
});