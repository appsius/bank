'use strict';

///////////////////////////////////////
// Modal windo
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab--container');
const content = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const section1 = document.querySelector('#section--1');

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
btnScroll.addEventListener('click', e => {
  const s1 = document.querySelector('#section--1');
  s1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tab functionlity
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  // Find active tab
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Class removal
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  content.forEach(c => c.classList.remove('operations__content--active'));

  // Class activation
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Hover effect
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation ///
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickifyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickifyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections ///
const sections = document.querySelectorAll('.section');

const revealObserver = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealObserver, {
  root: null,
  threshold: 0.15,
});

sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading imgs ///
const images = document.querySelectorAll('img[data-src]');

const loadImages = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0,
});

images.forEach(image => imageObserver.observe(image));

// Slider /// - ///
const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnPrev = document.querySelector('.slider__btn--left');
  const btnNext = document.querySelector('.slider__btn--right');
  const dotsContainer = document.querySelector('.dots');

  let currSlide = 0;
  const maxSlides = slides.length;

  const goToSlide = slide => {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
  };

  const createDots = () => {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDots = slide => {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const init = () => {
    goToSlide(0);
    createDots();
    activateDots(0);
  };
  init();

  const toNext = () => {
    if (currSlide === maxSlides - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
    activateDots(currSlide);
  };

  const toPrev = () => {
    if (currSlide === 0) {
      currSlide = maxSlides - 1;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
    activateDots(currSlide);
  };

  document.addEventListener('keydown', e => {
    e.key === 'ArrowRight' && toNext();
    e.key === 'ArrowLeft' && toPrev();
  });

  dotsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDots(slide);
    }
  });

  btnNext.addEventListener('click', toNext);
  btnPrev.addEventListener('click', toPrev);
};
slider();
