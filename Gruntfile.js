module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  // require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.initConfig({

    uglify: {
      my_target: {
        files: {
          'app/js/scripts.js': ['_/components/js/*.js']
        } //files
      } //my_target
    }, //uglify

    compass: {
      dev: {
        options: {
          config: 'config.rb'
        } //options
      }, //dev
      dist: {
                options: {
                    sassDir: '_/components/scss',
                    imagesDir: '/app/img',
                    cssDir: 'build/css',
                    javascriptsDir: 'build/lib',
                    httpGeneratedImagesPath: 'build/img',
                    noLineComments: true,
                    outputStyle: 'compressed'
                } //options
            } //dist
    }, //compass

    watch: {
      options: { livereload: true },

      scripts: {
        files: ['_/components/js/**/*.js'],
        tasks: ['uglify']
      }, //script

      sass: {
        files: ['_/components/scss/**/*.scss'],
        tasks: ['scsslint', 'compass:dev']
      }, //sass

      html: {
        files: ['app/*.html']
      },

      livereload: {
        options: { livereload: true },
        files: ['app/**/*']
      }

    }, //watch

    scsslint: {
      allFiles: [
        '_/components/scss/**/*.scss'
      ],
      options: {
        config: null,
        reporterOutput: null,
        colorizeOutput: true
      }
    }, // scsslint

    connect: {
      server: {
        options: {
          livereload: true,
          base: 'app/',
          port: '9009',
          open: {
            target: 'http://localhost:9009'
          }
        }
      }
    }

  }) //initConfig
  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('dist', ['compass']);
} //exports