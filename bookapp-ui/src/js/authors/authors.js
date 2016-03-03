'use strict';

var bookapp = angular.module('bookapp');

bookapp.config(function config($stateProvider) {
    $stateProvider.state('authors', {
        url: '/authors',
        templateUrl: 'pages/authors.tpl.html'
    });
});

bookapp.controller('AuthorController', function ($scope, $http, Author) {

    $scope.authors = Author.query();
    $scope.currentAuthor = new Author();
    $scope.showId = false;

    $scope.cancel = function () {
        $scope.currentAuthor = new Author();
    };

    $scope.save = function () {
        var isNew = $scope.currentAuthor.id == null;
        if (isNew) {
            $scope.currentAuthor = Author.save($scope.currentAuthor);
            $scope.authors.push(angular.copy($scope.currentAuthor));
        } else {
            $scope.currentAuthor = Author.update($scope.currentAuthor);
            $scope.replaceById($scope.authors, angular.copy($scope.currentAuthor));
        }
        $scope.cancel();
    };

    $scope.edit = function (author) {
        $scope.currentAuthor = angular.copy(author);
    };

    $scope.remove = function (index, id) {
        $scope.authors.splice(index, 1);
        Author.remove({authorId: id});
    };
});

bookapp.factory('Author', function ($resource) {
    return $resource('api/authors/:authorId', {authorId: '@id'}, {
        'update': {method: 'PUT'},
        'query': {
            transformResponse: function (data, headers) {
                var embedded = JSON.parse(data)._embedded;
                return embedded[Object.keys(embedded)[0]];
            },
            isArray: true
        }
    });
});