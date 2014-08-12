// Generated on 2014-08-12 using generator-webapp 0.4.8
'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: {
            // Configurable paths
            src: 'src',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
       watch: {
          scripts: {
            files: ['**/*.js'],
            tasks: ['uglify'],
            options: {
              spawn: false
            }
          }
        },

        // min
        uglify: {
            basic: {
                files: [{
                        expand:true,
                        cwd:'<%= config.src %>',
                        src:'**/*.js',
                        dest: '<%= config.dist %>/'
                }]
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*'
                    ]
                }]
            }
        }
    });

    grunt.registerTask('default', [
        'clean:dist',
        'uglify'
    ]);
};
