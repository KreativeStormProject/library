let modal = document.getElementById('addBookModal');
let addCircleIcon = document.getElementById('add-circle');

addCircleIcon.onclick = function () {
    modal.style.display = 'block';
};
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

function closeModal() {
    modal.style.display = 'none';
}


function Book(title, author, numberP, read) {
    this.title = title;
    this.author = author;
    this.numberP = numberP;
    this.read = read === 'yes';
    this.deleteBook = function () {
        
    };
}

let myLibrary = [];

function saveToLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}

document.addEventListener('DOMContentLoaded', function () {
    const storedLibrary = localStorage.getItem('myLibrary')
    if (storedLibrary) {
        myLibrary = JSON.parse(storedLibrary)
    }
    displayBooks()
});


function displayBooks() {
    const container = document.getElementById('cards');
    container.innerHTML = ''; // Clear existing content

    myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <h2>Title: ${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Number of pages: ${book.numberP}</p>
            <p>Mark as Read
                <label class="switch">
                    <input type="checkbox" ${book.read ? 'checked' : ''}>
                    <span class="slider round"></span>
                </label>
            </p>
            <div class="icons">
                <i class="material-icons" onclick="openEditModal(${index})">edit</i>
                <i class="material-icons" onclick="deleteBook(${index})">delete</i>
            </div>
        `;

        container.appendChild(card);
    });
    modal.style.display = 'none';
}


document.getElementById('addBookModal').addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const numberP = document.getElementById('number_of_pages').value;
    const read = document.getElementById('read').value;

    const newBook = new Book(title, author, numberP, read);
    myLibrary.push(newBook);
    saveToLocalStorage();
    displayBooks();

    document.getElementById('addBookModal').reset();
});


function openEditModal(index) {
    
    console.log("here")
    const book = myLibrary[index];
    const editModal = document.getElementById('editBookModal');

    // Pre-fill the form with existing book information
    document.getElementById('editTitle').value = book.title;
    document.getElementById('editAuthor').value = book.author;
    document.getElementById('editNumber_of_pages').value = book.numberP;
    document.getElementById('editRead').value = book.read ? 'yes' : 'no';

    // Store the index of the book being edited
    editModal.setAttribute('data-edit-index', index);

    // Display the edit modal
    editModal.style.display = 'block';
}

function saveEdit() {
    const editModal = document.getElementById('editBookModal');
    const index = editModal.getAttribute('data-edit-index');

    const newTitle = document.getElementById('editTitle').value;
    const newAuthor = document.getElementById('editAuthor').value;
    const newNumberP = document.getElementById('editNumber_of_pages').value;
    const newRead = document.getElementById('editRead').value;

    // Update the book object with new values
    myLibrary[index] = new Book(newTitle, newAuthor, newNumberP, newRead);

    // Refresh the display
    saveToLocalStorage();
    displayBooks();

    // Close the edit modal
    editModal.style.display = 'none';
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    saveToLocalStorage();
    displayBooks();
    }