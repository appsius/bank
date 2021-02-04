'use strict';

///////////////////////////////////////
// Modal windo
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header');

let cookieMes = document.createElement('div');
cookieMes.classList.add('cookie-message');
cookieMes.innerHTML =
  'We add cookies to improve functionality and analytics. <button class="btn btn--close-cookie">Close</button>';
header.after(cookieMes);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  cookieMes.remove();
});

cookieMes.style.width = '100%';
cookieMes.style.backgroundColor = 'black';

cookieMes.style.height = `${
  parseFloat(getComputedStyle(cookieMes).height, 10) + 30
}px`;

document.documentElement.style.setProperty('--color-primary', 'blue');
