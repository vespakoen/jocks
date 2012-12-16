// Ratchet
define([
  // Jocks.
  "jocks"
],

// Map dependencies from above array.
function(Jocks) {

  var Ratchet = {};

  // ---------------
  // BASE BLOCKS
  // ---------------

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

  // ---------------------
  // HEADER RELATED BLOCKS
  // ---------------------

  Ratchet.Header = Jocks.Blocks.View.extend({
    includeOptions: ["backButton", "backButtonTitle", "title", "titleBar", "titleBarChildren", "secondaryBar", "secondaryBarChildren"],
  
    getDefaultOptions: function() {
      return {
        backButton: null,
        backButtonTitle: null,
        title: "",
        titleBar: null,
        titleBarChildren: [],
        secondaryBar: null,
        secondaryBarChildren: [],
        elements: {}
      };
    },
  
    buildComponent: function() {
      if( ! this.titleBar) {
        this.titleBar = new Ratchet.TitleBar({
          backButton: this.backButton,
          backButtonTitle: this.backButtonTitle,
          title: this.title,
          children: this.titleBarChildren
        });
      }
  
      if( ! this.secondaryBar) {
        this.secondaryBar = new Ratchet.SecondaryBar();
      }
    },
  
    addTitleBarChild: function(child) {
      this.titleBar.add(child);
    },
  
    addSecondaryBarChild: function(child) {
      this.secondaryBarChildren.push(child);
    },
  
    render: function() {
      // Trigger before:render event
      this.trigger("before:render");
  
      var titleBarEl = this.titleBar.render().el;
      this.addElement("titleBarContainer", titleBarEl);
      this.el.appendChild(titleBarEl);
      
      var secondaryBarEl = this.secondaryBar.render().el;
      this.addElement("secondaryBarContainer", secondaryBarEl);
      this.el.appendChild(secondaryBarEl);
  
      // Render secondarybar children
      _.each(this.secondaryBarChildren, function(child) {
        this.elements.secondaryBarContainer.appendChild(child.render().el);
      }, this);    
      
      // Trigger render event
      this.trigger("render");
      return this;
    }
  });

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

  Ratchet.SecondaryBar = Jocks.Blocks.ParentView.extend({
    className: "bar-header-secondary",
  
    includeOptions: ["style", "children"],
  
    getDefaultOptions: function() {
      return {
        children: [],
        style: "standard",
        elements: {}
      };
    },
  
    buildComponent: function() {
      this.$el.addClass("bar-" + this.style);
  
      this.addElement("childContainer", this.el);
    },
  
    setStyle: function(style) {
      $(this.el)
        .removeClass("bar-standard bar-title")
        .addClass("bar-" + style);
    }
  });

  Ratchet.SegmentedController = Jocks.Blocks.ParentView.extend({
    tagName: "ul",
  
    className: "segmented-controller",
  
    includeOptions: ["children", "activeItem"],
  
    shims: [],
  
    getDefaultOptions: function() {
      return {
        children: [],
        activeItem: null,
        elements: {}
      };
    },
  
    afterInitialize: function() {
      this.buildComponent();
      this.bindTo(this, "after:render", this.activateActiveTab, this);
    },
  
    activateActiveItem: function() {
      if(this.activeItem) {
        this.setActiveItem(this.activeItem);
      }
    },
  
    setActiveItem: function(index) {
      _.each(this.shims, function(shim, i) {
        shim.$el.removeClass('active');
        if(index == i) {
          shim.$el.addClass('active');
        }
      });
    },
  
    render: function() {
      // Trigger before:render event
      this.trigger("before:render");
  
      // Clean the view
      while (this.elements.childContainer.hasChildNodes()) {
        this.elements.childContainer.removeChild(this.elements.childContainer.firstChild);
      }
  
      // Clean up the shims
      _.each(this.shims, function(shim) {
        shim.close();
      });
  
      // Render children
      _.each(this.children, function(child) {
        child.$el.removeClass("button");
        var segmentedControllerItem = new Ratchet.SegmentedControllerItem({
          child: child
        });
        this.shims.push(segmentedControllerItem);
        segmentedControllerItemEl = segmentedControllerItem.render().el;
  
        this.elements.childContainer.appendChild(segmentedControllerItemEl);
      }, this);
      
      // Trigger render event
      this.trigger("render");
      return this;
    }
  });

  Ratchet.SegmentedControllerItem = Jocks.Blocks.View.extend({
    tagName: "li",
  
    className: "item",
    
    includeOptions: ["attr", "active", "child"],
  
    getDefaultOptions: function() {
      return {
        attr: {},
        active: false,
        child: null
      };
    },
  
    buildComponent: function() {
      this.$el.attr(this.attr);
  
      if(this.active) {
        this.$el.addClass("active");
      }
    },
  
    activate: function() {
      this.$el.addClass("active");
    },
  
    deactivate: function() {
      this.$el.removeClass("active");
    },
  
    render: function() {
      // Render the child
      var childEl = this.child.render().el;
  
      // Add the "item" class to the child
      $(childEl).addClass("item");
  
      // Append the child
      this.el.appendChild(childEl);
      return this;
    }
  });

  // ---------------------
  // TABBAR RELATED BLOCKS
  // ---------------------

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

  Ratchet.Tab = Jocks.Blocks.View.extend({
    tagName: "li",
  
    className: "tab-item",
  
    includeOptions: ["icon", "iconClass", "title", "active", "attr"],
  
    getDefaultOptions: function() {
      return {
        icon: null,
        iconClass: null,
        title: null,
        active: null,
        attr: {}
      };
    },
  
    buildComponent: function() {
      if(this.active) {
        this.$el.addClass('active');
      }
      
      var tabButton = this.tabButton = new Mobile.TabButton({
        children: children,
        attr: this.attr
      });
  
      if(this.icon) {
        var tabIconEl = new Mobile.TabImageIcon({
          icon: this.icon,
          attr: this.attr
        }).render().el;
        tabButton.add(tabIconEl);
      }
      if(this.iconClass) {
        var tabIconEl = new Mobile.TabAwesomeIcon({
          iconClass: this.iconClass,
          attr: this.attr
        }).render().el;
        tabButton.add(tabIconEl);
      }
      var tabLabel = new Mobile.TabLabel({
        title: this.title,
        attr: this.attr
      });
      tabButton.add(tabLabel);
  
      var tabButtonEl = tabButton.render().el;
      this.el.appendChild(tabButtonEl);
      
      return this;
    }
  });

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

  Ratchet.TabLabel = Jocks.Blocks.View.extend({
    className: "tab-label",
  
    includeOptions: ["attr", "title"],
  
    getDefaultOptions: function() {
      return {
        attr: {},
        title: ""
      };
    },
  
    buildComponent: function() {
      this.$el.attr(this.attr);
      this.$el.html(this.title);
    }
  });

  Ratchet.TabImageIcon = Jocks.Blocks.View.extend({
    tagName: "img",
  
    className: "tab-icon",
  
    includeOptions: ["attr", "icon"],
  
    getDefaultOptions: function() {
      return {
        attr: {},
        icon: ""
      };
    },
  
    buildComponent: function() {
      if(this.src) {
        this.attr.src = this.src;
      }
      this.$el.attr(this.attr);
    }
  });

  // -------
  // WIDGETS
  // -------

  Ratchet.TabGroup = Jocks.Blocks.ParentView.extend({
    className: "tab-group",
  
    includeOptions: ["children", "activeTab"],
  
    getDefaultOptions: function() {
      return {
        children: [],
        activeTab: 0,
        preloadTabs: true,
        elements: {}
      };
    },
  
    render: function() {
      // Trigger before:render event
      this.trigger("before:render");
  
      // Clean the view
      while (this.elements.childContainer.hasChildNodes()) {
        this.elements.childContainer.removeChild(this.elements.childContainer.firstChild);
      }
  
      // Render children
      _.each(this.children, function(child, i) {
        var tabEl = this.make('div', {
          "class": "tab" + (i == this.activeTab) ? " active" : ""
        });
        this.elements.childContainer.appendChild(tabEl);
  
        var tabRegion = new Backbone.Marionette.Region({
          el: tabEl
        });
  
        // Instantiate a new region for the tab
        this.tabs.push(tabRegion);
  
        if(this.preloadTabs || this.activeTab == i) {
          tabRegion.show(child);
        }
      }, this);
      
      // Trigger render event
      this.trigger("render");
      return this;
    },
  
    getActiveTabIndex: function(idOrTabOrIndex) {
      for(var i in this.children) {
        var tab = this.children[i];
  
        if(
            // Check for id match (string)
            (typeof idOrTabOrIndex == "string" && tab.id == idOrTabOrIndex)
          ||
            // Check for tab match (Backbone view's CID)
            (idOrTabOrIndex.cid && idOrTabOrIndex.cid == tab.cid)
          ||
            // Check for index match (integer)
            (idOrTabOrIndex == i)
        ) {
          return i;
        }
      }
  
      // No tab found? Make the first one active
      return 0;    
    },
  
    setActiveTab: function(idOrTabOrIndex) {
      var activeTabIndex = this.activeTab = this.getActiveTabIndex(idOrTabOrIndex);
      var activeTab = this.children[activeTabIndex];
      
      // Remove the "active" class from all tabs
      this.$el.children()
        .removeClass('active');
  
      // Add the "active" class to the new tab
      this.$el.children('.tab')
        .eq(activeTabIndex)
        .addClass('active');
  
      if( ! this.preloadTabs) {
        // Show the new content
        this.tabs[activeTabIndex].show(activeTab);
      }
      
      activeTab.triggerMethod("tab:show", activeTab);
      _.each(this.children, function(child, i) {
        if(i !== activeTabIndex) {
          child.triggerMethod("tab:hide", child);
        }
      });
    }
  });

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

  // ----------------
  // ALL-ROUND BLOCKS
  // ----------------

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

  Ratchet.Chevron = Jocks.Blocks.View.extend({
    tagName: "span",
  
    className: "chevron"
  });

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

  // -----
  // ICONS
  // -----

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

  Jocks.Mobile.Ratchet = Ratchet;

  // Return the module for AMD compliance.
  return Ratchet;

});