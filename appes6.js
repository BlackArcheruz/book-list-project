class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
};
class UI{
    addBookToList = function(book){
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = 
        `<tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</td>
        </tr>`;
        list.appendChild(row);
    };
    deleteBook = function(target){
        if(target.className === 'delete') {
          target.parentElement.parentElement.remove();
        }
    };
    clearFields = function(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    };
    showAlert = function(msg,classname){
        const div = document.createElement('div');
        div.className = `alert ${classname}`;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },5000);
    };
};
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')=== null){
            books = [];
        }else{
            books=JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI;
            ui.addBookToList(book);
        });
    }
    static addBook(book){
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
    };
    static removeBook(isbn) {
        const books = Store.getBooks();
    
        books.forEach(function(book, index){
         if(book.isbn === isbn) {
          books.splice(index, 1);
         }
        });
    
        localStorage.setItem('books', JSON.stringify(books));
      };
};
document.addEventListener('DOMContentLoaded', Store.displayBooks);
document.getElementById('book-form').addEventListener('submit', function(e){
    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    // Instantiate book
    const book = new Book(title,author,isbn);
    // Instantiate UI
    const ui = new UI();
    // validate
    if(title === ''|| author === ''|| isbn=== ''){
        // Error alert
        ui.showAlert('Please fill in these fields', 'error');
    }else{
    // Add book to list
    ui.addBookToList(book);
    Store.addBook(book);
    // Clear Fields
    ui.clearFields();
    ui.showAlert('Book added', 'succes');
    }

    e.preventDefault();
});
document.getElementById('book-list').addEventListener('click',function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('Book Removed!', 'error');
    e.preventDefault();
})