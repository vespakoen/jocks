Ratchet.Count = Jocks.Blocks.View.extend({
  tagName: "span",

  className: "count",

  includeOptions: ["count"],

  getDefaultOptions: function() {
    return {
      count: 0
    };
  },

  // Build the component
  buildComponent: function() {
    this.setCount(this.count);
  },

  // Change the count
  setCount: function(count) {
    this.count = count;
    this.el.innerHTML = count;
  }
});