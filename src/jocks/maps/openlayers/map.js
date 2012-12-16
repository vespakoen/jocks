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