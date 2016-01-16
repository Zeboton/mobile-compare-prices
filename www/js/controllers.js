var defaultGroups = [
    {price: 1, quantity: 1},
    {price: 1, quantity: 1}
];

angular.module('app.controllers', [])

        .controller('comparePricePerOneUnitCtrl', function ($scope, $location, groups) {
            $scope.groups = groups.get();

            $scope.add = function () {
                $scope.groups.push({
                    price: 1,
                    quantity: 1
                });
            };

            $scope.go = function (view) {
                groups.set($scope.groups);
                $location.url(view);
            }

            $scope.reset = function () {
                groups.clear();
                $scope.groups = aceLangLib.copyArray(defaultGroups);
            }
        })

        .controller('resultCtrl', function ($scope, groups) {
            var localGroups = [];
            var bestRatio = null;
            var worstRatio = null;

            var groups = groups.get();

            for (group in groups) {
                var g = groups[group];
                var ratio = g.quantity / g.price;

                if (null == bestRatio) {
                    bestRatio = ratio;
                } else if (ratio < bestRatio) {
                    bestRatio = ratio;
                }

                if (null == worstRatio) {
                    worstRatio = ratio;
                } else if (ratio > worstRatio) {
                    worstRatio = ratio;
                }

                localGroups.push({
                    price: g.price,
                    quantity: g.quantity,
                    ratio: g.quantity / g.price
                });
            }

            if (bestRatio != worstRatio) {
                for (g in localGroups) {
                    if (bestRatio == localGroups[g].ratio) {
                        localGroups[g].best = true;
                    }
                    if (worstRatio == localGroups[g].ratio) {
                        localGroups[g].worst = true;
                    }
                }
            }

            $scope.groups = localGroups;
        })

        .controller('tabsCtrl', function ($scope, $location) {
            $scope.zClear = function (view)
            {
                angular.element(document.getElementById('compare-form')).scope().reset();
                $location.url(view);
            }
        })

        .factory('groups', ['$localstorage', function ($localstorage) {
                return {
                    set: function (value) {
                        return $localstorage.setObject('groups', value);
                    },
                    get: function () {
                        return $localstorage.getObject('groups');
                    },
                    clear: function () {
                        $localstorage.setObject('groups', defaultGroups);
                    }
                };
            }])
        