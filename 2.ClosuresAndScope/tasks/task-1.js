/* Task Description */
/* 
 *	Create a module for working with books
 *	The module must provide the following functionalities:
 *	Add a new book to category
 *	Each book has unique title, author and ISBN
 *	It must return the newly created book with assigned ID
 *	If the category is missing, it must be automatically created
 *	List all books
 *	Books are sorted by ID
 *	This can be done by author, by category or all
 *	List all categories
 *	Categories are sorted by ID
 *	Each book/category has a unique identifier (ID) that is a number greater than or equal to 1
 *	When adding a book/category, the ID is generated automatically
 *	Add validation everywhere, where possible
 *	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
 *	Author is any non-empty string
 *	Unique params are Book title and Book ISBN
 *	Book ISBN is an unique code that contains either 10 or 13 digits
 *	If something is not valid - throw Error
 */

function solve() {
    var library = (function () {
        var books = [],
            categories = [];

        function checkUniqueTitle(title){
            var i,
                len;
            for(i = 0, len = books.length; i < len; i+=1){
                if (title === books[i].title) {
                    return false;
                }
            }
            return true;
        }

        function checkUniqueISBN(isbn){
            var i,
                len;
            for(i = 0, len = books.length; i < len; i+=1){
                if (isbn === books[i].isbn) {
                    return false;
                }
            }
            return true;
        }

        function addBook(book) {
            book.ID = books.length + 1;

            if (book.title.length < 2 || book.title.length > 100) {
                throw new Error('Error! Title length is wrong.');
            }
            if (book.category.length < 2 || book.category.length > 100) {
                throw new Error('Error! Category length is wrong.');
            }
            if (book.author.length === 0) {
                throw new Error('Error! Author must be non empty.');
            }
            if (book.isbn.length !== 10 && book.isbn.length !== 13) {
                throw new Error('Error! ISBN must be only 10 or 13 digits');
            }

            if (!checkUniqueTitle(book.title)) {
                throw new Error('Error! Title must be unique.');
            }
            if (!checkUniqueISBN(book.isbn)) {
                throw new Error('Error! ISBN must be unique.');
            }

            books.push(book);
            if (!(categories.indexOf(book.category) > -1)) {
                var category = book.category;
                category.id = categories.length + 1;
                categories.push(category);
            }
            return book;
        }

        function listBooks(bookProperty) {
            // check if empty array
            if (books.length === 0) {
                return [];
            }

            if (bookProperty !== undefined) {
                // check if sorting by certain category
                if (bookProperty.category !== undefined) {
                    return books.filter(function (book) {
                        if (book.category === bookProperty.category) {
                            return book;
                        }
                    });
                }
                // check if sorting by certain author
                if (bookProperty.author !== undefined) {
                    return books.filter(function (book) {
                        if (book.author === bookProperty.author) {
                            return book;
                        }
                    });
                }
            }
            return books;
        }

        function listCategories() {
            return categories;
        }

        return {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories
            }
        };
    } ());
    return library;
}
module.exports = solve;
