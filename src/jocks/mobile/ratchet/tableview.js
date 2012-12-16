Ratchet.TableView = Jocks.Blocks.CollectionView.extend({
  tagName: "ul",

  className: "list",

  itemView: Ratchet.TableViewRow,

  itemViewOptions: function(model) {
    var options = _.pick(this.options, "chevron", "count", "parse");
    if(this.parse) options.parse = this.parse;
    return options;
  }
});