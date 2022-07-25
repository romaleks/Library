const main = document.querySelector('main')
let books = document.querySelectorAll('.book');
let statusBtn = document.querySelector('.status-btn');
let removeBtns = document.querySelectorAll('.remove-btn');
const addBtn = document.querySelector('.add');
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.remove-btn');
const form = document.querySelector('form')
const titleInput = document.getElementById('name');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const statusInput = popup.querySelector('.status-btn');
const submitBtn = popup.querySelector('.popup-submit');
const statusBtns = document.querySelectorAll('[id="example"], [id="input"]')

let btnStatus = {
   'Not Read': 'not-read',
   'Currently Reading': 'reading',
   'Read': 'read'
};

let myLibrary = [];

form.addEventListener('submit', (e) => {
   e.preventDefault();
   const bookTitle = titleInput.value;
   const bookAuthor = authorInput.value;
   const bookPages = pagesInput.value;
   const bookStatus = statusInput.getAttribute('data-status');
   const newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
   addBookToLibrary(newBook);
   displayBook(createBook(newBook), newBook);
});

statusBtns.forEach(btn => changeBookStatus(btn));

function Book(title, author, pages, status) {
   this.title = title;
   this.author = author;
   this.numOfPages = pages;
   this.status = status;
}

Book.prototype.changeStatus = changeBookStatus;

function addBookToLibrary(book) {
   myLibrary.push(book);
}

function createBook(book) {
   const bookElement = document.createElement('div');
   bookElement.setAttribute('data-status', book.status);
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

function changeBookStatus(btn) {
   btn.addEventListener('click', () => {
      const parentOfBtn = btn.parentNode;
      let i = Number(btn.getAttribute('data-index'));
      if (i === 2) i = -1;
      btn.textContent = Object.keys(btnStatus)[++i];
      btn.setAttribute('data-status', btnStatus[Object.keys(btnStatus)[i]]);
      if (parentOfBtn.classList.contains('book')) {
         parentOfBtn.setAttribute('data-status', btnStatus[Object.keys(btnStatus)[i]]);
      }
      btn.setAttribute('data-index', i);
   });
}

function displayBook(book, newBook) {
   main.insertBefore(book, addBtn);
   books = document.querySelectorAll('.book');
   statusBtn = book.querySelector('.status-btn');
   newBook.changeStatus(statusBtn);
}

function togglePopup() {
   popup.classList.toggle('active');
}