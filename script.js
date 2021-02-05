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
  //const s1coords = s1.getBoundingClientRect();

  //window.scrollTo({
  //  left: s1coords.left + window.pageXOffset,
  //  top: s1coords.top + window.pageYOffset,
  //  behavior: 'smooth',
  //});

  s1.scrollIntoView({ behavior: 'smooth' });
});

const navLinks = document.querySelectorAll('.nav__item');

navLinks.forEach((link, i) => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const section = document.querySelector(`#section--${i + 1}`);
    section.scrollIntoView({ behavior: 'smooth' });
  });
});
