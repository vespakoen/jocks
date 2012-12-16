// Ratchet
define([
  // Jocks.
  "jocks"
],

// Map dependencies from above array.
function(Jocks) {

  var Google = {};

  //= ../../jocks/maps/google/helpers.js

  //= ../../jocks/maps/google/model.js

  //= ../../jocks/maps/google/map.js

  Jocks.Maps.Google = Google;

  // Return the module for AMD compliance.
  return Google;

});