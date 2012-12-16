// Ratchet
define([
  // Jocks.
  "jocks"
],

// Map dependencies from above array.
function(Jocks) {

  var OpenLayers = {};

  //= ../../../jocks/maps/openlayers/helpers.js

  //= ../../../jocks/maps/openlayers/model.js

  //= ../../../jocks/maps/openlayers/map.js

  Jocks.Maps.OpenLayers = OpenLayers;

  // Return the module for AMD compliance.
  return OpenLayers;

});