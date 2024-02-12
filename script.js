const slider = document.querySelector('#slider');
const slides = [...slider.children];
const controls = document.querySelectorAll('.container-controls');
const prevBtn = document.querySelector('.container-controls.left');
const nextBtn = document.querySelector('.container-controls.right');
const sectionWidth = slider.querySelector('.section').offsetWidth;

let isDragging = false, startX, startScrollLeft;

let slidesPerView = Math.round(slider.offsetWidth / sectionWidth);

slides.slice(-slidesPerView).reverse().forEach((slide) => {
  slider.insertAdjacentHTML('afterbegin', slide.outerHTML);
})

slides.slice(0, slidesPerView).forEach((slide) => {
  slider.insertAdjacentHTML('beforeend', slide.outerHTML);
})

controls.forEach((control) => {
  control.addEventListener('click', () => {
    slider.scrollLeft += control.id === 'left' ? -sectionWidth : sectionWidth;
  })
})

const startDragging = (evt) => {
  isDragging = true;
  slider.classList.add('dragging');
  
  startX = evt.pageX;
  startScrollLeft = slider.scrollLeft;
}

const stopDragging = (evt) => {
  isDragging = false;
  slider.classList.remove('dragging');
}

const dragging = (evt) => {
  if (!isDragging) return;
  slider.scrollLeft = startScrollLeft - (evt.pageX - startX);

}

const infiniteScroll = () => {
  if (slider.scrollLeft === 0) {
    slider.classList.add('no-transition');
    slider.scrollLeft = slider.scrollWidth - (2 * slider.offsetWidth)
    slider.classList.remove('no-transition');
  } else if (Math.ceil(slider.scrollLeft) === slider.scrollWidth - slider.offsetWidth) {
    slider.classList.add('no-transition');
    slider.scrollLeft = slider.offsetWidth;
    slider.classList.remove('no-transition');
  }
}

slider.addEventListener("mousedown", startDragging);
document.addEventListener("mouseup", stopDragging);
slider.addEventListener("mousemove", dragging);
slider.addEventListener("scroll", infiniteScroll);