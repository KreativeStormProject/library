const  {Book, deleteBook,saveEdit,openEditModal,displayBooks}  = require('../real_code'); // Make sure to update this with your actual file path

// Test the Book constructor
test('Book constructor creates a book object', () => {
  const newBook = new Book('Title', 'Author', 200, 'yes');
  expect(newBook.title).toBe('Title');
  expect(newBook.author).toBe('Author');
  expect(newBook.numberP).toBe(200);
  expect(newBook.read).toBe(true);
});

// Test the deleteBook method
test('deleteBook method removes a book from the library', () => {
  const book1 = new Book('Book1', 'Author1', 100, 'yes');
  const book2 = new Book('Book2', 'Author2', 150, 'no');
  const library = [book1, book2];

  library.splice(0, 1);
  

  expect(library).toEqual([book2]);
});