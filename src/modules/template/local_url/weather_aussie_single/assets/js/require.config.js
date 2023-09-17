requirejs.config({
    basePath: '/assets/js',
    paths: {
        'main': 'main',
        'helper': 'helper',
        'current': 'current',
        'forecast': 'forecast',
        'helperEnums': 'helper.enums',
        'forecastUtilities': 'forecast.utilities',
        'luxon': 'luxon',
        'dompurify': 'dompurify',
        'textfit': 'textFit'
    },
    shim: {
        main: {
            deps: ['helper', 'current', 'forecast']
        },
        helper: {
            deps: ['helper.enums', 'luxon'],
            exports: 'helper'
        },
        helperEnums: {
            exports: 'helper.enums'
        },
        current: {
            deps: ['helper', 'dompurify', 'textFit'],
            exports: 'current'
        },
        forecast: {
            deps: ['helper', 'luxon', 'dompurify', 'forecast.utilities', 'textFit'],
            exports: 'forecast'
        },
        forecastUtilities: {
            exports: 'forecast.utilities'
        },
        luxon: {
            exports: 'luxon'
        },
        dompurify: {
            exports: 'dompurify'
        },
        textfit: {
            exports: 'textFit'
        }
    }
});
require(['main'], function (main) {
    let app = new main.main(clientData);
    app.run();
});
