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