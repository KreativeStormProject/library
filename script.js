let modal = document.getElementById('addBookModal');
let addCircleIcon = document.getElementById('add-circle');

document.addEventListener('DOMContentLoaded', function () {
    let addCircleIcon = document.getElementById('add-circle');

    addCircleIcon.onclick = function () {
        modal.style.display = 'block';
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    
    
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

        modal.style.display = 'none';
        document.getElementById('addBookModal').reset();
    });

    document.getElementById('editBookModal').addEventListener('submit', function (event) {
        event.preventDefault();

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
    });
});



function Book(title, author, numberP, read) {
    this.title = title;
    this.author = author;
    this.numberP = numberP;
    this.read = read === 'yes';
}

let myLibrary = [];



function closeModal() {
    modal.style.display = 'none';
}

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
    
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h2');
        title.textContent = `Title: ${book.title}`;

        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;

        const numberOfPages = document.createElement('p');
        numberOfPages.textContent = `Number of pages: ${book.numberP}`;

        const markAsRead = document.createElement('p');
        markAsRead.innerHTML = `
            Mark as Read
            <label class="switch">
                <input type="checkbox" ${book.read ? 'checked' : ''}>
                <span class="slider round"></span>
            </label>
        `;

        const iconsContainer = document.createElement('div');
        iconsContainer.className = 'icons';

        const editIcon = document.createElement('i');
        editIcon.className = 'material-icons';
        editIcon.textContent = 'edit';
        editIcon.onclick = () => openEditModal(index);

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'material-icons';
        deleteIcon.textContent = 'delete';
        deleteIcon.onclick = () => deleteBook(index);

        iconsContainer.appendChild(editIcon);
        iconsContainer.appendChild(deleteIcon);

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(numberOfPages);
        card.appendChild(markAsRead);
        card.appendChild(iconsContainer);

        container.appendChild(card);
});

}



function openEditModal(index) {
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


function deleteBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}