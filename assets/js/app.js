import "./prevent-image-drag.js";

// Create <section class="slide"> elements
function createSlide(index) {
  const slide = document.createElement('section');
  slide.classList.add('slide');
  slide.hidden = true;

  if (index !== undefined) {
    slide.id = `slide-${index}`;
  }

  return slide;
}

// Group elements separated by <hr> into <section> elements
function slidify(container) {
  
  const sections = [];
  let index = 0;
  let current = createSlide(index);

  for (const node of [...container.childNodes]) {
    if (node.nodeName === 'HR') {
      sections.push(current);
      current = createSlide(++index);
    } else {
      current.append(node);
    }
  }

  if (current.hasChildNodes()) {
    sections.push(current);
  }

  container.replaceChildren(...sections);

  // Unhide container
  container.hidden = false;

  return sections;
}

// Container element
const main = document.querySelector('main');

// Parse and store slide elements
const slides = slidify(main);

// Keep track of current slide (by index)
let current = 0;

function show(slide) {
  slide.hidden = false;
  window.location.hash = slide.id;
}

function hide(slide) {
  slide.hidden = true;
}

function changeSlide(index) {

  // Reached start
  if (index < 0) {
    index = 0;
  }

  // Reached end
  else if (index >= slides.length) {
    index = slides.length - 1;
  }

  slides.forEach((slide, i) => {
    if (i === index) {
      show(slide);
    } else {
      hide(slide);
    }
  });

  current = index;
}

function nextSlide() {
  changeSlide(current + 1);
}

function prevSlide() {
  changeSlide(current - 1);
}

// Display slide that matches URL #
if (window.location.hash) {

  // Select element with that id
  const slide = document.querySelector(window.location.hash);

  // If element exists
  if (slide) {

    // Get slide index
    const index = slides.indexOf(slide);

    // Set it as current
    changeSlide(index);

  } else {
    changeSlide(0);
  }
  
}
// Otherwise, show first slide appears if no #slide-… is on URL
else {
  changeSlide(0);
}

// Change slides when certain keys are pressed
window.addEventListener('keydown', (event) => {

  // If user is typing in some elements, ignore
  const isTyping = event.target.closest('input, textarea, select, [contenteditable]');
  if (isTyping) return;

  // Otherwise change slides if certain keys were pressed
  switch (event.key) {
    case 'ArrowRight':
    case ' ':
      nextSlide(slides);
      break;
  
    case 'ArrowLeft':
      prevSlide(slides);
      break;
  }
});