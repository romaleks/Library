const book = document.querySelectorAll('.book');
const statusBtns = document.querySelectorAll('.status-btn');
const removeBtn = document.querySelectorAll('.remove-btn');
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.remove-btn');
const form = document.querySelector('form')
const titleInput = document.getElementById('name');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const statusBtn = popup.querySelector('.status-btn');
const submitBtn = popup.querySelector('.popup-submit');

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
   const bookStatus = statusBtn.getAttribute('data-status');
   const newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
   addBookToLibrary(newBook);
});

function Book(title, author, pages, status) {
   this.title = title;
   this.author = author;
   this.numOfPages = pages;
   this.status = status;
}

function addBookToLibrary(book) {
   myLibrary.push(book);
}

function togglePopup() {
   popup.classList.toggle('active');
}

statusBtns.forEach(btn => {
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
});