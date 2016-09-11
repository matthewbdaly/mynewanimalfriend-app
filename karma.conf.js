module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['browserify', 'jasmine'],
        files: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'js/*.js',
            'tests/*.js'
        ],
        exclude: [
        ],
        preprocessors: {
            'js/*.js': ['browserify', 'coverage'],
            'tests/js': ['browserify']
        },
        browserify: {
          debug: true
        },
        reporters: ['progress', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true,
        coverageReporter: {
          dir : 'coverage/',
          reporters: [
            { type: 'html', subdir: 'report-html' },
            { type: 'cobertura', subdir: 'report-cobertura' }
          ]
        }
    });
};
