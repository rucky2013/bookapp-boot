'use strict';
import utils from '../bookapp.utils';

export default class BookController {

    /*@ngInject;*/
    constructor($http, Book, Author) {
        this.$http = $http;
        this.Book = Book;
        this.Author = Author;

        // properties
        this.books = this.Book.query();
        this.authors = this.Author.query();

        this.currentBook = new this.Book();
        this.currentBook.releasedate = new Date().toISOString();
        this.showId = false;
    }

    cancel() {
        this.currentBook = new this.Book();
        this.currentBook.releasedate = new Date().toISOString();
    };

    save() {
        var isNew = this.currentBook.id == null;
        if (isNew) {
            this.currentBook = this.Book.save(this.currentBook);
            this.$http.get(this.currentBook.author).then(response => {
                this.currentBook.author = response.data;
                this.books.push(angular.copy(this.currentBook));
                this.cancel();
            });
        } else {
            this.currentBook = this.Book.update(this.currentBook);
            this.$http.get(this.currentBook.author).then(response => {
                this.currentBook.author = response.data;
                utils.replaceById(this.books, angular.copy(this.currentBook));
                this.cancel();
            });
        }
    };

    edit(book) {
        this.currentBook = angular.copy(book);
        this.currentBook.releasedate = new Date(this.currentBook.releasedate);
        this.currentBook.author = utils.filterById(this.authors, book.author.id)._links.self.href;
    };

    remove(index, id) {
        this.books.splice(index, 1);
        this.Book.remove({bookId: id});
    };

    openDatePicker($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.opened = true;
    };

}