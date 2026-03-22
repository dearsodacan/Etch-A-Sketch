export { darkeningSpan, sketchBoard, darkeningButton, resetButton, createButton };

const darkeningSpan = document.querySelector('#darkening-span');

const sketchBoard = document.querySelector('#js-sketch-board');
sketchBoard.addEventListener('mouseover', paintOverCell);

const darkeningButton = document.querySelector('[data-action="darkening"]');
darkeningButton.addEventListener('click', paintOverCell);

let darkeningAllowed = false;
let darkeningProgress = 1;

function paintOverCell(event) {
  let target = event.target;

  if (target.dataset.action === 'darkening' && darkeningAllowed === false) {
    darkeningAllowed = true;
    darkeningProgress = 1;
    darkeningSpan.textContent = 'Enabled!';
  } else if (target.dataset.action === 'darkening' && darkeningAllowed === true) {
    darkeningAllowed = false;
    darkeningSpan.textContent = 'Disabled!';
  };

  if (target.classList.contains('sketch-dot')) {
    target.style.cssText = 
    `background-color: rgb(
      ${Math.floor(Math.random() * 255 + 1)},
      ${Math.floor(Math.random() * 255 + 1)},

      ${Math.floor(Math.random() * 255 + 1)},
      ${darkeningAllowed === true ? darkeningProgress -= 0.1: parseFloat((Math.random()).toFixed(3))});`
  };
};

const createButton = document.querySelector('[data-action="create"]');
createButton.addEventListener('click', createSketch);

function createSketch() {
  userSettings = parseInt(prompt('Squares per side for the new grid?'));

  if (!userSettings) {
    alert('Empty input!');
    return;
  };
  if (userSettings > 100) {
    alert(`The number cannot be greater than 100! (${userSettings})`);
    return;
  };
  
  sketchBoard.innerHTML = '';
  sketchBoard.style.gridTemplateColumns = `repeat(${userSettings}, 1fr)`;
  sketchBoard.innerHTML = '<div class="sketch-dot"></div>'.repeat(userSettings * userSettings);
};

const resetButton = document.querySelector('[data-action="reset"]');
resetButton.addEventListener('click', () => {
  const pixels = [...sketchBoard.children];

  pixels.forEach((pixel) => {
    if (pixel.getAttribute('style')) {
      pixel.removeAttribute('style');
      darkeningProgress = 1;
      darkeningAllowed = false;
      darkeningSpan.textContent = 'Disabled!';
  }});
});