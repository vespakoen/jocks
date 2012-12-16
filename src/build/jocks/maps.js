// Ratchet
define([
  // Jocks.
  "jocks"
],

// Map dependencies from above array.
function(Jocks) {

  var Maps = {};

  //= ../../jocks/maps/openlayers.js

  //= ../../jocks/maps/google.js

  Jocks.Maps = Maps;

  // Return the module for AMD compliance.
  return Maps;

});