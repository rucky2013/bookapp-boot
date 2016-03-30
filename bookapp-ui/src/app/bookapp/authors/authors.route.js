'use strict';

import authorsTpl from './authors.tpl.html';

export default function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
      .state('authors', {
        url: '/authors',
        templateUrl: authorsTpl,
        controller: require('./authors.controller'),
        controllerAs: 'authorCtrl'
      });
}
