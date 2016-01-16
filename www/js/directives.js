angular.module('app.directives', [])

        .directive('zIf', [function () {
                return {
                    link: function( scope, element, attrs ){
                        var g = angular.fromJson(attrs.group);
                        
                        if ( true == g.best ){
                            element.css('background','#dff0d8');
                        }
                        
                        if ( true == g.worst ){
                            element.css('background','#f9f2f4');
                        }
                    }
                }
            }]);

