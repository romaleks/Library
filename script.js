const book = document.querySelector('.book');
const removeBtn = document.querySelector('.book__remove');

removeBtn.addEventListener('click', () => {
   book.style.transform = 'scale(0)';
   setTimeout(() => book.style.display = 'none', 300);
})