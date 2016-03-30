'use strict';

import booksRoute from "./books/books.route";
import authorsRoute from "./authors/authors.route";

const bookapp = angular.module('bookapp', [
    'ui.router',
    'ui.bootstrap'
]);

require('./books/books.factory')(bookapp);
require('./authors/authors.factory')(bookapp);

bookapp.config(authorsRoute);
bookapp.config(booksRoute);

export default bookapp;
