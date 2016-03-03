'use strict';

var bookapp = angular.module('bookapp');

bookapp.config(function config( $stateProvider ) {
    $stateProvider.state( 'books', {
        url: '/books',
        templateUrl: 'pages/books.tpl.html'
    });
});

bookapp.controller('BookController', function ($scope, $http, Book, Author) {

    $scope.books = Book.query();
    $scope.authors = Author.query();

    $scope.currentBook = new Book();
    $scope.currentBook.releasedate = new Date();
    $scope.showId = false;

    $scope.cancel = function () {
        $scope.currentBook = new Book();
        $scope.currentBook.releasedate = new Date();
    };

    $scope.save = function () {
        var isNew = $scope.currentBook.id == null;
        if (isNew) {
            $scope.currentBook = Book.save($scope.currentBook);
            $http.get($scope.currentBook.author).then(function(response) {
                $scope.currentBook.author = response.data;
                $scope.books.push(angular.copy($scope.currentBook));
                $scope.cancel();
            });
        } else {
            $scope.currentBook = Book.update($scope.currentBook);
            $http.get($scope.currentBook.author).then(function(response) {
                $scope.currentBook.author = response.data;
                $scope.replaceById($scope.books, angular.copy($scope.currentBook));
                $scope.cancel();
            });
        }
    };

    $scope.edit = function (book) {
        $scope.currentBook = angular.copy(book);
        $scope.currentBook.releasedate = new Date($scope.currentBook.releasedate);
        $scope.currentBook.author = $scope.filterById($scope.authors, book.author.id)._links.self.href;
    };

    $scope.remove = function (index, id) {
        $scope.books.splice(index, 1);
        Book.remove({bookId: id});
    };

    $scope.openDatePicker = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
});

bookapp.factory('Book', function ($resource) {
    return $resource('api/books/:bookId', {bookId: '@id'}, {
        'query': {
            url: 'api/books/:bookId?projection=inlineAuthor',
            transformResponse: function (data, headers) {
                var embedded = JSON.parse(data)._embedded;
                return embedded[Object.keys(embedded)[0]];
            },
            isArray: true
        },
        'update': {method: 'PUT'}
    });
});