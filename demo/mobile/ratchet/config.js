require.config({
  paths: {
    jocks: "../../../lib/jocks"
  },

  shim: {
  	"../../../lib/jocks/mobile/ratchet": ["../../../lib/jocks/blocks"],
  }
});

define([
  "../../../lib/jocks/mobile/ratchet",
],

// Map dependencies from above array.
function(Ratchet) {

  var app = new Backbone.Marionette.Application();

  app.addRegions({
    headerRegion: "#header-region",
    contentRegion: "#content-region",
    footerRegion: "#footer-region"
  });

  app.start();

  var backButton = new Ratchet.Button({
    title: "Back"
  });

  var header = new Ratchet.Header({
    backButton: backButton,
    title: "Hello World",
  });

  var button1 = new Ratchet.Button({
    title: "Button1"
  });

  var button2 = new Ratchet.Button({
    title: "Button2"
  });

  var segmentedController = new Ratchet.SegmentedController({
    children: [
      button1,
      button2
    ]
  });

  header.addSecondaryBarChild(segmentedController);

  var cogButton = new Ratchet.Button({
    icon: new Ratchet.FontIcon({
      icon: "cog"
    })
  });

  header.addTitleBarChild(cogButton);

	app.headerRegion.show(header);

});