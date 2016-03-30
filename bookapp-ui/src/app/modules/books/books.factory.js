'use strict';

export default function (app) {
    app.factory('Book', bookFactory);
    function bookFactory ($resource) {
        'ngInject';
        return $resource('api/books/:bookId', {bookId: '@id'}, {
            'query': {
                url: 'api/books/:bookId?projection=inlineAuthor',
                transformResponse: function (data, headers) {
                    try {
                        var embedded = JSON.parse(data)._embedded;
                        return embedded[Object.keys(embedded)[0]];
                    } catch(e) {
                        return null;
                    }
                },
                isArray: true
            },
            'update': {method: 'PUT'}
        });
    }
}
