// Book constructor
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
};
// UI constructor
function UI(){};
// Add book to list
UI.prototype.addBookToList = function(book){
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
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
};
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};
// Show Alert
UI.prototype.showAlert = function(msg,classname){
    const div = document.createElement('div');
    div.className = `alert ${classname}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div,form);
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },5000);
}
// Event Listener
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
    // Clear Fields
    ui.clearFields();
    ui.showAlert('Book added', 'succes');
    }

    e.preventDefault();
});
document.getElementById('book-list').addEventListener('click',function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book Removed!', 'error');
    e.preventDefault();
})