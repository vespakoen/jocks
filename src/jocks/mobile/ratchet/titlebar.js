Ratchet.TitleBar = Jocks.Blocks.ParentView.extend({
  tagName: "header",

  className: "bar-title",

  includeOptions: ["backButton", "backButtonTitle", "title", "children"],

  getDefaultOptions: function() {
    return {
      children: [],
      elements: {}
    };
  },

  // Build the component
  buildComponent: function() {
    if(this.backButtonTitle) {
      // We only got a title for the back button,
      // let's create the button ourselves
      var backButtonEl = new Mobile.Button({
        title: this.backButtonTitle,
        attr: {
          href: "javascript:window.history.back();"
        }
      }).render().el;
      this.backButton = this.addElement('backButton', backButtonEl);
      // Append the back button to the this.el
      this.el.appendChild(backButtonEl);
    }
    else if(this.backButton) {
      var backButtonEl = this.backButton.render().el;
      this.addElement('backButton', backButtonEl);
      // Append back button to the this.el
      this.el.appendChild(backButtonEl);
    }

    if(this.title) {
      // Create the title element
      var title = this.makeElement('title', 'h1', {
        "class": "title"
      }, this.title);

      // Append the title to the this.el
      this.el.appendChild(title);
    }

    this.addElement("childContainer", this.el);
  },

  // Change the header's title
  setTitle: function(value) {
    this.title = value;
    this.elements.title.innerHTML = value;
  },

  // Change the backbutton's text
  setBackButtonTitle: function(value) {
    this.backButtonTitle = value;
    this.elements.backButton.setTitle(value);
  },

  // Hide the backbutton
  hideBackButton: function() {
    this.elements.backButton.style.display = "none";
  },

  // Show to backbuton
  showBackButton: function() {
    this.elements.backButton.style.display = "block";
  }
});