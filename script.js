const book = document.querySelector('.book');
const removeBtn = document.querySelector('.remove-btn');
const popup = document.querySelector('.popup');
const popupStatusBtn = popup.querySelector('.status-btn');

let btnStatus = {
   'Not Read': 'not-read',
   'Currently Reading': 'reading',
   'Read': 'read'
};
let step = 1;

removeBtn.addEventListener('click', () => {
   book.style.transform = 'scale(0)';
   setTimeout(() => book.style.display = 'none', 300);
})

popupStatusBtn.addEventListener('click', () => {
   popupStatusBtn.setAttribute('data-status', btnStatus[Object.keys(btnStatus)[step]])
   popupStatusBtn.textContent = Object.keys(btnStatus)[step++];
   if (step === 3) step = 0;
})