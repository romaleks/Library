const main = document.querySelector('main')
let books = document.querySelectorAll('.book');
let statusBtn = document.querySelector('.status-btn');
let removeBtns = main.querySelectorAll('.remove-btn');
const addBtn = document.querySelector('.add');
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.remove-btn');
const form = document.querySelector('form')
const titleInput = document.getElementById('name');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const statusInput = popup.querySelector('.status-btn');
const submitBtn = popup.querySelector('.popup-submit');

let btnStatus = {
   'Not Read': 'not-read',
   'Currently Reading': 'reading',
   'Read': 'read'
};

myLibrary = [];

function Book(title, author, pages, status) {
   this.title = title;
   this.author = author;
   this.numOfPages = pages;
   this.status = status;
}

Book.prototype.changeStatus = changeBookStatus;

const exampleBook = new Book('Harry Potter', 'J. K. Rowling', '600', 'reading');
addBookToLibrary(exampleBook);
displayBook(createBook(exampleBook));

changeBookStatus(statusInput);

form.addEventListener('submit', (e) => {
   e.preventDefault();
   const bookTitle = titleInput.value;
   const bookAuthor = authorInput.value;
   const bookPages = pagesInput.value;
   const bookStatus = statusInput.getAttribute('data-status');
   const newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
   addBookToLibrary(newBook);
   displayBook(createBook(newBook));
   titleInput.value = '';
   authorInput.value = '';
   pagesInput.value = '';
   statusInput.setAttribute('data-status', 'not-read');
   statusInput.setAttribute('data-index', '0');
   statusInput.textContent = 'Not Read';
});

function addBookToLibrary(book) {
   myLibrary.push(book);
}

function createBook(book, index) {
   const bookElement = document.createElement('div');
   bookElement.setAttribute('data-status', book.status);
   bookElement.setAttribute('data-index', index);
   bookElement.classList.add('book');
   bookElement.innerHTML = `
      <div class="book__name">
         <div class="book__title">"${book.title}"</div>
         <div class="book__author">${book.author}</div>
      </div>
      <div class="book__pages">${book.numOfPages} Pages</div>
      <button type="button" data-status="${book.status}" data-index="${Object.keys(btnStatus).indexOf(Object.keys(btnStatus).find(key => btnStatus[key] === book.status))}" class="status-btn">${Object.keys(btnStatus).find(key => btnStatus[key] === book.status)}</button>
      <div class="remove-btn"></div>
   `;
   return bookElement;
}

function changeBookStatus(btn, book) {
   btn.addEventListener('click', () => {
      const parentOfBtn = btn.parentNode;
      let i = Number(btn.getAttribute('data-index'));
      if (i === 2) i = -1;
      btn.textContent = Object.keys(btnStatus)[++i];
      const stat = btnStatus[Object.keys(btnStatus)[i]]
      btn.setAttribute('data-status', stat);
      if (parentOfBtn.classList.contains('book')) {
         parentOfBtn.setAttribute('data-status', stat);
         book.status = stat;
      }
      btn.setAttribute('data-index', i);
   });
}

function displayBook(book) {
   main.insertBefore(book, addBtn);
   books = document.querySelectorAll('.book');
   loopBooks();
}

function loopBooks() {
   books.forEach(book => book.remove())
   let index = 0;
   for (let item of myLibrary) {
      const book = createBook(item, index++);
      main.insertBefore(book, addBtn);
      statusBtn = book.querySelector('.status-btn');
      item.changeStatus(statusBtn, item);
   }
   books = document.querySelectorAll('.book');
   removeBtns = main.querySelectorAll('.remove-btn');
   removeBtns.forEach(btn => btn.addEventListener('click', () => removeBook(btn.parentNode)));
}

function removeBook(book) {
   book.style.transform = 'scale(0)';
   myLibrary.splice(book.getAttribute('data-index'), 1);
   setTimeout(() => loopBooks(), 200);
}

function togglePopup() {
   popup.classList.toggle('active');
}