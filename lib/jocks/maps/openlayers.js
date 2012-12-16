// Ratchet
define([
  // Jocks.
  "jocks"
],

// Map dependencies from above array.
function(Jocks) {

  var OpenLayers = {};

  OpenLayers.Helpers = {
    // Projection used on the map
    internalProjection: new OpenLayers.Projection('EPSG:900913'),
    
    // Projection used for the server
    externalProjection: new OpenLayers.Projection('EPSG:4326'),
  
    // Transform a point from EPSG:900913 to EPSG:4326
    to4326: function(point) {
      // Get the point in EPSG:4326
      return point.transform(OpenLayers.Helpers.internalProjection, OpenLayers.Helpers.externalProjection);
    },
  
    // Transform a point from EPSG:4326 to EPSG:900913
    to900913: function(point) {
      // Get the point in EPSG:900913
      return point.transform(OpenLayers.Helpers.externalProjection, OpenLayers.Helpers.internalProjection);
    },
  
    // Untested
    toWKT: function(feature) {
      return OpenLayers.Helpers.WKtParser.write(feature);
    },
  
    fromWKT: function(WKT) {
      return OpenLayers.Helpers.WKtParser.read(WKT);
    },
  
    distanceBetween: function(longitude1, latitude1, longitude2, latitude2) {
      var OLLocation1 = OpenLayers.Helpers.to900913(new OpenLayers.Geometry.Point(longitude1, latitude1));
      var OLLocation2 = OpenLayers.Helpers.to900913(new OpenLayers.Geometry.Point(longitude2, latitude2));
      
      return OLLocation1.distanceTo(OLLocation2);
    },
  
    prettyLength: function(length) {
      if(length < 1000) {
        return length.toFixed(0) + ' m';
      }
      return (length / 1000).toFixed(2) + ' km';
    },
  
    prettyDistance: function(distance) {
      if(distance < 1000) {
        return distance.toFixed(0) + ' m';
      }
      return (distance / 1000).toFixed(2) + ' km';
    }
  };

  OpenLayers.Model = Backbone.Model.extend({
    defaults: {
      // The default zoom-level of the map
      zoom: 10,
  
      // The default center of the map
      center: new OpenLayers.LonLat(5.8, 50.8),
    }
  });

  OpenLayers.Map = Jocks.Blocks.ItemView.extend({
    // The map's controls
    controls: {},
  
    // The map's layers
    layers: {},
  
    // The map instance
    map: null,
  
    beforeConstructor: function() {
      this.mapModel = new Model();
      this.map = new OpenLayers.Map(this.el, {
        theme: null
      });
  
      var OSM = new OpenLayers.Layer.OSM('Openstreetmap', null, {
        transitionEffect: 'resize'
      });
  
      this.map.addLayer(OSM);
  
      // Add a listener to the map model, if the location
      // or zoom level changes, the view will be updated accordingly
      this.mapModel.on('change', _.bind(this.updateMap, this));
    },
  
    // Render the map to represent the map model's state
    updateMap: function() {
      // Center and zoom the map
      this.map.setCenter(OpenLayers.Helpers.to900913(this.mapModel.get('center')));
      this.map.zoomTo(this.mapModel.get('zoom'));
  
      return this;
    },
  
    // Add a layer to the map
    addLayer: function(key, layer) {
      this.layers[key] = layer;
      this.map.addLayer(layer);
    },
  
    // Add a multiple layers to the map
    // Pass in an object, keys will be
    // used to reference the layers later on
    addLayers: function(layers) {
      for(var key in layers) {
        var layer = layers[key];
        this.addLayer(key, layer);
      }
    },
  
    // Add a control to the map
    addControl: function(key, control) {
      this.controls[key] = control;
      this.map.addControl(control);
    },
  
    // Add a multiple controls to the map
    // Pass in an object, keys will be
    // used to reference the controls later on
    addControls: function(controls) {
      for(var key in controls) {
        var control = controls[key];
        this.addControl(key, control);
      }
    },
  
    activateControls: function(controls) {
      for(var key in this.controls) {
        var control = this.controls[key];
        if($.inArray(key, controls) > -1) {
          control.activate();
        }
        else {
          control.deactivate();
        }
      }
    },
  });

  Jocks.Maps.OpenLayers = OpenLayers;

  // Return the module for AMD compliance.
  return OpenLayers;

});