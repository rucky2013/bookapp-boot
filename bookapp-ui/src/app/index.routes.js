'use strict';

function routeConfig($urlRouterProvider) {
  'ngInject';
  $urlRouterProvider.otherwise('/books');
}

export default angular.module('index.routes', []).config(routeConfig);