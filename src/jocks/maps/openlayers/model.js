OpenLayers.Model = Backbone.Model.extend({
  defaults: {
    // The default zoom-level of the map
    zoom: 10,

    // The default center of the map
    center: new OpenLayers.LonLat(5.8, 50.8),
  }
});