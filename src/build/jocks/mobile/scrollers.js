// Ratchet
define([
  // Jocks.
  "jocks"
],

// Map dependencies from above array.
function(Jocks) {

  var Scrollers = {};

  //= ../../../jocks/mobile/general/scrollers/scroller/scroller.js

  //= ../../../jocks/mobile/general/scrollers/scroller/carousel.js

  //= ../../../jocks/mobile/general/scrollers/iscroll/scroller.js

  //= ../../../jocks/mobile/general/scrollers/iscroll/carousel.js

  Jocks.Mobile.Scrollers = Scrollers;

  // Return the module for AMD compliance.
  return Scrollers;

});