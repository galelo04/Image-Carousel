const imageSliderManager = (function () {
  let imagesNumber = 0;
  let dots;
  let currentImageIndex = 0;
  const init = () => {
    const images = document.querySelectorAll('.image');
    dots = document.querySelector('.dots');
    images.forEach((image) => {
      image.classList.add('hidden');
      createDot(imagesNumber++);
    });
    images[0].classList.remove('hidden');
    bindEvents();
  };
  const createDot = (id) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (id === 0) dot.classList.add('current');
    dot.setAttribute('imageNumber', id);
    dots.appendChild(dot);
  };
  const bindEvents = () => {
    const left = document.querySelector('#left');
    const right = document.querySelector('#right');
    left.addEventListener('click', previous);
    right.addEventListener('click', next);
    dots.addEventListener('click', navigateImages);
  };
  const getNextIndex = (currentIndex, imagesNumber, increment = 1) => {
    const nextIndex = (+currentIndex + increment + imagesNumber) % imagesNumber;
    return nextIndex;
  };
  const next = () => {
    hideImage(currentImageIndex);
    currentImageIndex = getNextIndex(currentImageIndex, imagesNumber);
    showImage(currentImageIndex);
  };
  const previous = () => {
    hideImage(currentImageIndex);
    currentImageIndex = getNextIndex(currentImageIndex, imagesNumber, -1);
    showImage(currentImageIndex);
  };
  const showImage = (index) => {
    const nextImage = document.querySelector(`#image${index}`);
    nextImage.classList.remove('hidden');
    document.querySelector(`[imageNumber="${index}"]`).classList.add('current');
  };
  const hideImage = (index) => {
    const currentImage = document.querySelector(`#image${index}`);
    currentImage.classList.add('hidden');
    document
      .querySelector(`[imageNumber="${index}"]`)
      .classList.remove('current');
  };
  const navigateImages = (event) => {
    if (event.target && event.target.classList.contains('dot')) {
      hideImage(currentImageIndex);
      currentImageIndex = event.target.getAttribute('imageNumber');
      showImage(currentImageIndex);
    }
  };
  init();
  setInterval(next, 5000);
})();
