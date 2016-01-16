angular.module('app.services', [])
        // http://learn.ionicframework.com/formulas/localstorage/
        .factory('$localstorage', ['$window', function ($window) {
                return {
                    set: function (key, value) {
                        $window.localStorage[key] = value;
                    },
                    get: function (key, defaultValue) {
                        return $window.localStorage[key] || defaultValue;
                    },
                    setObject: function (key, value) {
                        $window.localStorage[key] = JSON.stringify(value);
                    },
                    getObject: function (key, defaultValue) {
                        return JSON.parse($window.localStorage[key] || ( defaultValue || '{}' ));
                    }
                }
            }])

        .service('BlankService', [function () {

            }]);

