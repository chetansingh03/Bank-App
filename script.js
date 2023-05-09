'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
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

//
///
///
///scrolling features/
///
//
//

const section = document.querySelector('#sample');
const btn = document.querySelector('.btn--scroll-to');

btn.addEventListener('click', function (e) {
  const sec = section.getBoundingClientRect();
  console.log(sec);
  console.log(e.target.getBoundingClientRect());
  console.log(window.pageXOffset, pageYOffset);

  /*window.scrollTo({
    left: sec.left + window.pageXOffset,
    top: sec.top + window.pageYOffset,
    behavior: 'smooth',
  });*/

  section.scrollIntoView({ behavior: 'smooth' });
});

/* const linkk = document.querySelectorAll('.nav__link');
linkk.forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('hre');

    const sec = document.querySelector(`${id}`);
    sec.scrollIntoView({ behevior: 'smooth' });
  });
}); */

const parentLink = document.querySelector('.nav__links');

parentLink.addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const sc = e.target.getAttribute('hre');
    const ln = document.querySelector(`${sc}`);
    ln.scrollIntoView({ behavior: 'smooth' });
  }
});

//////////
///////
//
//tabbed content
//
//
//IMPORTANT
//
//

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const content = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clickTab = e.target.closest('.operations__tab');

  if (!clickTab) return;

  //remove active class
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  content.forEach(c => c.classList.remove('operations__content--active'));

  //Add active class to new tab

  clickTab.classList.add('operations__tab--active');

  //Active content area

  document
    .querySelector(` .operations__content--${clickTab.dataset.tab}`)
    .classList.add('operations__content--active');
});

//
//
//

const nav = document.querySelector('.nav');
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
/* nb.addEventListener('mouseover', function (e) {
  const link = e.target;
  const sib = e.target.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img');
  sib.forEach(el => {
    if (el !== link) el.style.opacity = 0.5;
  });
  logo.style.opacity = 0.5;
});
nb.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sib = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    sib.forEach(el => {
      el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
}); */

//
//
////Sticky navbar
//
//
/* const section1 = document.querySelector('#section--1');
const st = section1.getBoundingClientRect();
console.log(st.top);
window.addEventListener('scroll', function () {
  if (window.scrollY > st.top) nav.classList.add('sticky');
}); */
//

//By using observer API
//
const header = document.querySelector('.header');
const section1 = document.querySelector('#section--1');
const hight = nav.getBoundingClientRect().height;

const obOption = {
  root: null,
  threshold: 0,
  rootMargin: `-${hight}px`,
};
const obserFun = function (entries) {
  const [ent] = entries;

  if (!ent.isIntersecting) {
    nav.classList.add('sticky');
    nav.style.background = 0;
  } else nav.classList.remove('sticky');
};
const observ = new IntersectionObserver(obserFun, obOption);
observ.observe(header);
//
//
//////////
//
//
//////Revealing elements on scrolling
//
//
const tarEle = document.querySelectorAll('.section');

const Obfun = function (entries, observ) {
  const [ent] = entries;

  if (!ent.isIntersecting) return;
  else ent.target.classList.remove('section--hidden');
  observ.unobserve(ent.target);
};
const observApI = new IntersectionObserver(Obfun, {
  root: null,
  threshold: 0.18,
});
tarEle.forEach(el => {
  observApI.observe(el);
  el.classList.add('section--hidden');
});
//
///
/////
//////
////
/////
/////Lazy Loading images
////
///

const tEle = document.querySelectorAll('img[data-src]');

const Obbfun = function (entries, observe) {
  const [ent] = entries;
  if (!ent.isIntersecting) return;
  ent.target.src = ent.target.dataset.src;
  ent.target.addEventListener('load', () => {
    ent.target.classList.remove('lazy-img');
  });
  observe.unobserve(ent.target);
};
const observAp = new IntersectionObserver(Obbfun, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
tEle.forEach(el => {
  observAp.observe(el);
});
////

///

/////Slider

//

const sliDer = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slider = document.querySelector('.slider');
  const dotsContain = document.querySelector('.dots');

  slides.forEach((s, i) => {
    s.style.transform = `translateX(${i * 100}%)`;
  });
  /* slider.style.transform = 'scale(0.4) translateX(-1000px)';
slider.style.overflow = 'visible'; */

  let currentSlide = 0;
  const geNextSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  geNextSlide(0);
  /*  gonextslide(0) = slides.forEach((s, i) => {
  s.style.transform = `translateX(${i * 100}%)`;
}); */

  //
  const creatDot = function () {
    slides.forEach((_, i) => {
      dotsContain.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  creatDot();

  const currentDot = function (curDot) {
    document.querySelectorAll('.dots__dot').forEach(s => {
      s.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${curDot}"]`)
      .classList.add('dots__dot--active');
  };
  currentDot(0);
  const nextSlide = function () {
    if (currentSlide === slides.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    geNextSlide(currentSlide);
    currentDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide--;
    }
    geNextSlide(currentSlide);
    currentDot(currentSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotsContain.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dots__dot')) return;
    const dotNum = e.target.dataset.slide;
    currentDot(dotNum);
    geNextSlide(dotNum);
  });
};
sliDer();
/* const pare = document.querySelector('.nav__links');
const hh = pare.querySelector('.nav__lin').getAttribute('hre');
console.log(hh);
const j = document.querySelector(`${hh}`);

j.scrollIntoView({ behevior: 'smooth' }); */
//lectures
/* const header = document.querySelector('.header');

const h = document.querySelector('.highlight');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'Welcome to Advamce DOM  <button classname="btn btn--close-cookie">Get it </button>';
header.prepend(message);

message.style.backgroundColor = 'grey';
message.style.fontSize = '250%';
const st = document.querySelector('.txt');
st.style.fontSize = '110%';

const high = document.querySelector('.highlight');

document.documentElement.style.setProperty('--color-primary', 'green');

const att = document.querySelector('.nav__logo');
console.log(att.dataset.name1);

const even = document.querySelector('.txt');
const fun = function () {
  alert('What???');
};
even.addEventListener('click', fun);
//even.onclick = fun;
setTimeout(() => even.removeEventListener('click', fun), 5000);

//Bubbling and chasing
const color = function (a, b) {
  const c = Number(Math.trunc(Math.random() * (b - a + 1)) + a);
  return c;
};
const randomColor = () =>
  `rgb(${color(0, 255)},${color(0, 255)},${color(0, 255)})`;
console.log(randomColor());

const links = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');

const link = document.querySelectorAll('.nav__link');
link.forEach(el =>
  el.addEventListener('click', function (e) {
    el.style.backgroundColor = randomColor();
  })
);

links.addEventListener('click', function (e) {
  links.style.backgroundColor = randomColor();
});
nav.addEventListener('click', function (e) {
  nav.style.backgroundColor = randomColor();
  console.log(e.target, e.currentTarget);
}); */
