/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-rigger');
  grunt.loadNpmTasks('grunt-jasmine-runner');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      version: '<%= pkg.version %>',
    },

    lint: {
      files: ['src/**/*.js']
    },

    rig: {
      jocks: {
        src: ['src/build/jocks.js'],
        dest: 'lib/jocks.js'
      },
      jocks_blocks: {
        src: ['src/build/jocks/blocks.js'],
        dest: 'lib/jocks/blocks.js'
      },
      jocks_maps_openlayers: {
        src: ['src/build/jocks/maps/openlayers.js'],
        dest: 'lib/jocks/maps/openlayers.js'
      },
      jocks_maps_google: {
        src: ['src/build/jocks/maps/google.js'],
        dest: 'lib/jocks/maps/google.js'
      },
      jocks_mobile_ratchet: {
        src: ['src/build/jocks/mobile/ratchet.js'],
        dest: 'lib/jocks/mobile/ratchet.js'
      }/*,
      web_bootstrap: {
        src: ['src/build/jocks/web/bootstrap.js'],
        dest: 'lib/jocks.web.bootstrap.js'
      }*/
    },

    /*min: {
      mobile_ratchet: {
        src: ['<config:rig.mobile_ratchet.dest>'],
        dest: 'lib/jocks/mobile/ratchet.min.js'
      },
      web_bootstrap: {
        src: ['<config:rig.jocks.dest>', '<config:rig.web_bootstrap.dest>'],
        dest: 'lib/jocks.web.bootstrap.min.js'
      }
    },*/

    jasmine : {
      src : [
        'public/javascripts/jquery.js',
        'public/javascripts/json2.js',
        'public/javascripts/underscore.js',
        'public/javascripts/backbone.js',
        'public/javascripts/marionette.js',
        'lib/jocks.mobile.js',
        'lib/jocks.web.js',
      ],
      //helpers : 'spec/javascripts/helpers/*.js',
      specs : 'spec/javascripts/**/*.spec.js'
    },

    'jasmine-server' : {
      browser : false
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
        Backbone: true,
        _: true,
        Marionette: true,
        $: true,
        slice: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint rig min');

};