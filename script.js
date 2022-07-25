const book = document.querySelectorAll('.book');
const removeBtn = document.querySelectorAll('.remove-btn');
const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup__content');
const popupCloseBtn = popup.querySelector('.remove-btn')
const popupStatusBtn = popup.querySelector('.status-btn');

let btnStatus = {
   'Not Read': 'not-read',
   'Currently Reading': 'reading',
   'Read': 'read'
};
let step = 1;

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

popupStatusBtn.addEventListener('click', () => {
   popupStatusBtn.setAttribute('data-status', btnStatus[Object.keys(btnStatus)[step]])
   popupStatusBtn.textContent = Object.keys(btnStatus)[step++];
   if (step === 3) step = 0;
});