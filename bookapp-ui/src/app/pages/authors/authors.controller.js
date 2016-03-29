'use strict';
import utils from '../bookapp.utils';

export default class AuthorController {

    /*@ngInject;*/
    constructor($http, Author) {
        this.$http = $http;
        this.Author = Author;

        // properties
        this.authors = this.Author.query();
        this.currentAuthor = new this.Author();
        this.showId = false;
    }

    cancel() {
        this.currentAuthor = new this.Author();
    };

    save() {
        var isNew = this.currentAuthor.id == null;
        if (isNew) {
            this.currentAuthor = this.Author.save(this.currentAuthor);
            this.authors.push(angular.copy(this.currentAuthor));
        } else {
            this.currentAuthor = this.Author.update(this.currentAuthor);
            utils.replaceById(this.authors, angular.copy(this.currentAuthor));
        }
        this.cancel();
    };

    edit(author) {
        this.currentAuthor = angular.copy(author);
    };

    remove(index, id) {
        this.authors.splice(index, 1);
        this.Author.remove({authorId: id});
    };
}