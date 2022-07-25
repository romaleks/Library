const book = document.querySelectorAll('.book');
const removeBtn = document.querySelectorAll('.remove-btn');
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.remove-btn');
const statusBtns = document.querySelectorAll('.status-btn');

let btnStatus = {
   'Not Read': 'not-read',
   'Currently Reading': 'reading',
   'Read': 'read'
};

removeBtn.forEach(button => {
   button.addEventListener('click', () => {
      book.style.transform = 'scale(0)';
      setTimeout(() => book.style.display = 'none', 300);
   });
});

function togglePopup() {
   popup.classList.toggle('active')
}

popupCloseBtn.addEventListener('click', () => togglePopup());

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