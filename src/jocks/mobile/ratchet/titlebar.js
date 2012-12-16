Ratchet.TitleBar = Jocks.ParentView.extend({
  includeOptions: ["backButton", "backButtonTitle", "title", "children"],

  getDefaultOptions: function() {
    return {
      children: []
    };
  },

  // Build the component
  buildComponent: function() {
    var elements = this.elements = {};

    // Create the container element
    var childContainer = this.makeElement('childContainer', 'header', {
      "class": "bar-title"
    });

    if(this.backButtonTitle) {
      // We only got a title for the back button,
      // let's create the button ourselves
      var backButtonEl = new Mobile.Button({
        title: this.backButtonTitle,
        attr: {
          href: "javascript:window.history.back();"
        }
      }).render().el;
      var backButton = this.backButton = this.addElement('backButton', backButtonEl);
      // Append the back button to the childContainer
      childContainer.appendChild(backButton);
    }
    else if(this.backButton) {
      var backButtonEl = this.backButton.render().el;
      var backButton = this.addElement('backButton', backButtonEl);
      // Append back button to the childContainer
      childContainer.appendChild(backButton);
    }

    if(this.title) {
      // Create the title element
      var title = this.makeElement('title', 'h1', {
        "class": "title"
      }, this.title);

      // Append the title to the childContainer
      childContainer.appendChild(title);
    }

    // Set the element
    this.setElement(childContainer);
    
    return this;
  },

  // Post rendering methods
  // ------
  
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