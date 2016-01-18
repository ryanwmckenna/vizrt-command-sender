module.exports = function(grunt) {

	// configure the tasks
	grunt.initConfig({

		copy: {
			main: {
				files: [{
					src: '../client/dist/index.html',
					dest: 'server/client/views/index.html'
				}, {
					expand: true,
					cwd: '../client/dist/',
					src: '**/*.*',
					dest: 'server/public/'
				}, {
					expand: true,
					cwd: '../server/',
					src: 'package.json',
					dest: 'server/'
				}, {
					expand: true,
					cwd: '../server/',
					src: 'setup.js',
					dest: 'server/'
				}, {
					expand: true,
					cwd: '../server/',
					src: 'routes.js',
					dest: 'server/'
				}, {
					expand: true,
					cwd: '../server/',
					src: 'errorhandler.js',
					dest: 'server/'
				}, {
					expand: true,
					cwd: '../server/',
					src: 'app.js',
					dest: 'server/'
				}, {
					expand: true,
					cwd: '../server/',
					src: 'app-cluster.js',
					dest: 'server/'
				}, {
					expand: true,
					cwd: '../server/',
					src: 'config.json',
					dest: 'server/'
				}, {
					expand: true,
					cwd: '../server/controllers/',
					src: '**/*.js',
					dest: 'server/controllers/'
				},{
					expand: true,
					cwd: '../server/node_modules/',
					src: '**/*',
					dest: 'server/node_modules/'
				}, {
					expand: true,
					cwd: '../server/websockets/',
					src: '**/*.js',
					dest: 'server/websockets/'
				}]
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'server',
					]
				}]
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['clean:dist', 'copy']);
};
