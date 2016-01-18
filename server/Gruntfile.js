module.exports = function(grunt) {

	// configure the tasks
	grunt.initConfig({

		pkg: require('./package.json'),

		watch: {
			scripts: {
				files: [
					'server.js',
					'**/**/*.js'
				],
				tasks: ['jshint', 'nodemon'],
				options: {
					nospawn: true
				}
			}
		},
		nodemon: {
			dev: {
				script: 'app.js',
				options: {
					nodeArgs: ['--debug']
				}
			}
		},
		jshint: {
			all: ['app.js', 'api/**/*.js']
		}
	});


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-nodemon');

	grunt.registerTask('default', ['nodemon', 'watch']);

};
