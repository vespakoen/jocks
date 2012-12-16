Ratchet.Window = Jocks.Blocks.View.extend({
  includeOptions: ["backButtonTitle", "footer", "header", "content", "title", "scroll"],

  getDefaultOptions: function() {
    return {
      backButtonTitle: "Back",
      header: null,
      content: null,
      footer: null,
      title: ""
    };
  },

  show: function(options) {
    options = options || {};

    if(this.header) {
      if(this.backButtonTitle || this.backButtonTitle == false) { this.header.backButtonTitle = this.backButtonTitle; }
      if(this.title) { this.header.title = this.title; }
      app.headerRegion.show(this.header, options);
    }

    if(this.footer) {
      app.footerRegion.show(this.footer, options);
    }

    if(this.content) {
      app.contentRegion.show(this.content, options);
    }
  }
});