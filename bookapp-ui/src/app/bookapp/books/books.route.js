'use strict';

import booksTpl from './books.tpl.html';

export default function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
      .state('books', {
        url: '/books',
        templateUrl: booksTpl,
        controller: require('./books.controller'),
        controllerAs: 'bookCtrl'
      });
}
