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

  //= ../../../jocks/mobile/ratchet/window.js

  // ---------------------
  // HEADER RELATED BLOCKS
  // ---------------------

  //= ../../../jocks/mobile/ratchet/header.js

  //= ../../../jocks/mobile/ratchet/titlebar.js

  //= ../../../jocks/mobile/ratchet/secondarybar.js

  //= ../../../jocks/mobile/ratchet/segmentedcontroller.js

  //= ../../../jocks/mobile/ratchet/segmentedcontrolleritem.js

  // ---------------------
  // TABBAR RELATED BLOCKS
  // ---------------------

  //= ../../../jocks/mobile/ratchet/tabbar.js

  //= ../../../jocks/mobile/ratchet/tab.js

  //= ../../../jocks/mobile/ratchet/tabbutton.js

  //= ../../../jocks/mobile/ratchet/tablabel.js

  //= ../../../jocks/mobile/ratchet/tabimageicon.js

  // -------
  // WIDGETS
  // -------

  //= ../../../jocks/mobile/ratchet/tabgroup.js

  //= ../../../jocks/mobile/ratchet/tableviewrow.js

  //= ../../../jocks/mobile/ratchet/tableview.js

  // ----------------
  // ALL-ROUND BLOCKS
  // ----------------

  //= ../../../jocks/mobile/ratchet/button.js

  //= ../../../jocks/mobile/ratchet/chevron.js

  //= ../../../jocks/mobile/ratchet/count.js

  // -----
  // ICONS
  // -----

  //= ../../../jocks/mobile/ratchet/fonticon.js

  Jocks.Mobile.Ratchet = Ratchet;

  // Return the module for AMD compliance.
  return Ratchet;

});