'use strict';

var bookapp = angular.module('bookapp', ['ui.bootstrap','ui.router','ngResource']);

bookapp.config(function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/books');
});

bookapp.run(function($rootScope){
    $rootScope.filterById = function (array, id) {
        return array.filter(function (object) {
            return object.id == id;
        })[0];
    };
    $rootScope.replaceById = function(array, replacement) {
        array[array.indexOf($rootScope.filterById(array,replacement.id))]=replacement;
    };
});