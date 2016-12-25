var moment = require('moment');
var changeCase = require('change-case')

module.exports = function(grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*']
    });

    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-prompt');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            'cssSrcDir': 'src/sass',
            'cssTargetDir': 'css',
            'jsSrcDir': 'src/js',
            'jsTargetDir': 'js',
			'jsDependencies': [
				'bower_components/jquery/dist/jquery.min.js',
				'bower_components/history.js/scripts/bundled/html4+html5/jquery.history.js',
				'bower_components/imagesloaded/imagesloaded.pkgd.min.js',
				'bower_components/masonry/dist/masonry.pkgd.min.js',
				'bower_components/fitvids/jquery.fitvids.js',
				'bower_components/highlightjs/highlight.pack.min.js',
				'bower_components/nprogress/nprogress.js',
				'bower_components/reading-time/build/readingTime.min.js'
			],
			'cssDependencies': [
				'bower_components/normalize.css/normalize.css',
				'bower_components/highlightjs/styles/default.css',
				'bower_components/nprogress/nprogress.css'
			]
        },
        copy: {
	        dev: {
                files: [{
	                dest: 'assets/fonts/',
	                src: '**/*',
                    cwd: 'src/fonts/',
                    expand: true
                }, {
                    dest: 'assets/images/',
                    src: '**/*',
                    cwd: 'src/images/',
                    expand: true
                }]
	        },
	        dist: {
                files: [{
	                dest: 'assets/fonts/',
	                src: '**/*',
                    cwd: 'src/fonts/',
                    expand: true
                }, {
                    dest: 'assets/images/',
                    src: '**/*',
                    cwd: 'src/images/',
                    expand: true
                }]
	        } 
        },
        clean: {
            dist: ['assets/fonts', 'assets/css', 'assets/js']
        },
        sass: {
            dev: {
                options: {
                    sourceMaps: true
                },
                files: {
                    'assets/<%=  config.cssTargetDir %>/style.css': '<%=  config.cssSrcDir %>/style.scss'
                }
            },
            dist: {
                options: {
                    outputStyle: 'compressed',
                    sourceMaps: false
                },
                files: {
                    'assets/<%=  config.cssTargetDir %>/style.css': '<%=  config.cssSrcDir %>/style.scss'
                }
            }
        },
		cssmin: {
			dev: {
				options: {
					shorthandCompacting: false,
					roundingPrecision: -1,
					sourceMap: true
				},
				files: {
					'assets/<%=  config.cssTargetDir %>/dependencies.css': [
						'<%=	config.cssDependencies %>'
					]
				}
			},
			dist: {
				options: {
					shorthandCompacting: false,
					roundingPrecision: -1,
					sourceMap: false
				},
				files: {
					'assets/<%= config.cssTargetDir %>/dependencies.css': [
						'<%= config.cssDependencies %>'
					]
				}
			}
		},
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({ browsers: ['last 2 versions'] })
                ]
            },
            files: {
            	src: 'assets/<%=  config.cssTargetDir %>/*.css'
            }
        },
		uglify: {
			dev: {
				files: {
					'assets/<%= config.jsTargetDir %>/script.js': [
						'<%= config.jsSrcDir %>/**/*.js'
					],
					'assets/<%= config.jsTargetDir %>/dependencies.js': [
						'<%= config.jsDependencies %>'
					]
				}
			},
			devlight: {
				files: {
					'assets/<%= config.jsTargetDir %>/script.js': [
						'<%= config.jsSrcDir %>/**/*.js'
					]
				}
			},
			dist: {
				files: {
					'assets/<%= config.jsTargetDir %>/script.js': [
						'<%= config.jsSrcDir %>/**/*.js'
					],
					'assets/<%= config.jsTargetDir %>/dependencies.js': [
						'<%= config.jsDependencies %>'
					]
				}
			}
		},
        watch: {
            css: {
                files: '<%=  config.cssSrcDir %>/**/*.scss',
                tasks: ['sass:dev','copy:dev','postcss']
            },
            js: {
                files: '<%=  config.jsSrcDir %>/**/*.js',
                tasks: ['uglify:devlight']
            }
        },

        prompt: {
            target: {
                options: {
                    questions: [
                        {
                            config: 'template.process-markdown-template.options.data.title', // arbitrary name or config for any other grunt task
                            type: 'input', // list, checkbox, confirm, input, password
                            message: 'Post name', // Question to ask the user, function needs to return a string,
                            default: 'new post' // default value if nothing is entered
                        },
                        {
                            config: 'template.process-markdown-template.options.data.date', // arbitrary name or config for any other grunt task
                            type: 'input', // list, checkbox, confirm, input, password
                            message: 'Date', // Question to ask the user, function needs to return a string,
                            default: moment().toISOString() // default value if nothing is entered
                        },
                        {
                            config: 'template.process-markdown-template.options.data.categories', // arbitrary name or config for any other grunt task
                            type: 'input', // list, checkbox, confirm, input, password
                            message: 'Categories', // Question to ask the user, function needs to return a string,
                            default: '' // default value if nothing is entered
                        },
                        {
                            config: 'template.process-markdown-template.options.data.image', // arbitrary name or config for any other grunt task
                            type: 'input', // list, checkbox, confirm, input, password
                            message: 'Image', // Question to ask the user, function needs to return a string,
                            default: null // default value if nothing is entered
                        },
                        {
                            config: 'template.process-markdown-template.options.data.cover', // arbitrary name or config for any other grunt task
                            type: 'input', // list, checkbox, confirm, input, password
                            message: 'Cover image', // Question to ask the user, function needs to return a string,
                            default: null // default value if nothing is entered
                        }
                    ]
                }
            }
        },

        template: {
            'process-markdown-template': {
                'options': {
                    'data': {
                        'title': 'My blog post',
                        'date': 'Mathias Bynens',
                        'categories': '',
                        'image': 'Lorem ipsum dolor sit amet.',
                        'cover': 'Lorem ipsum dolor sit amet.',
                        'fileName': function () {
                            return moment(grunt.task.current.data.options.data.date).format('YYYY-MM-DD-') + changeCase.paramCase(grunt.task.current.data.options.data.title);
                        }
                    }
                },
                'files': {
                    '_posts/<%= grunt.task.current.data.options.data.fileName() %>.markdown': ['src/post.tpl.md']
                }
            }
        }
    });

    grunt.registerTask('new-post', [
        'prompt',
        'template:process-markdown-template'
    ]);

    grunt.registerTask('build', [
	    'clean:dist',
        'sass:dist',
        'cssmin:dist',
        'postcss',
        'copy:dist',
        'uglify:dist'
    ]);
    grunt.registerTask('default', [
        'sass:dev',
        'cssmin:dev',
        'postcss',
        'copy:dev',
        'uglify:dev',
        'watch'
    ]);
};