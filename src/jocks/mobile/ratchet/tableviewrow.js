Ratchet.TableViewRow = Jocks.Blocks.View.extend({
  tagName: "li",

  includeOptions: ["model", "parse"],

  buildComponent: function() {
    var fields = this.parse(this.model);

    var link = this.makeElement("link", "a", {
      href: fields.url
    });

    this.el.appendChild(link);

    if(fields.image) {
      var image = this.makeElement("image", "img", {
        src: "/" + fields.image
      });
      link.appendChild(image);

      this.$el.addClass("has-thumb");
    }

    if(fields.title) {
      var title = this.makeElement("title", "h2", {}, fields.title);
      link.appendChild(title);
    }

    if(fields.description) {
      var description = this.makeElement("description", "p", {}, fields.description);
      link.appendChild(description);
    }

    if(fields.chevron) {
      var chevron = this.makeElement("chevron", "span", {
        "class": "chevron"
      });
      link.appendChild(chevron);
    }

    if(fields.count !== false && fields.count !== null && typeof fields.count !== "undefined") {
      var count = this.makeElement("count", "span", {
        "class": "count"
      }, fields.count);
      link.appendChild(count);
    }
  }
});