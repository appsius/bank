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

// SMOOTH SCROLLING
const btnScroll = document.querySelector('.btn--scroll-to');
btnScroll.addEventListener('click', e => {
  const s1 = document.querySelector('#section--1');
  s1.scrollIntoView({ behavior: 'smooth' });
});

// EVENT BUBBLING
const randomize = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min + 1;

const randomColor = () =>
  `rgb(${randomize(0, 255)}, ${randomize(0, 255)}, ${randomize(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  //e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});
