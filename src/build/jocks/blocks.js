// Ratchet
define([
  // Jocks.
  "jocks"
],

// Map dependencies from above array.
function(Jocks) {

  var Blocks = {};

  //= ../../jocks/blocks/parentview.js

  //= ../../jocks/blocks/itemview.js

  //= ../../jocks/blocks/collectionview.js

  //= ../../jocks/blocks/compositeview.js

  //= ../../jocks/blocks/layout.js

  //= ../../jocks/blocks/view.js

  Jocks.Blocks = Blocks;

  // Return the module for AMD compliance.
  return Blocks;

});