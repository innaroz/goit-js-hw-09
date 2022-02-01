function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

stopBtn.disabled = true;

let refreshingBackround = null;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  document.getElementsByTagName('body')[0].style.backgroundColor = getRandomHexColor();

  refreshingBackround = setInterval(() => {
    document.getElementsByTagName('body')[0].style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(refreshingBackround);
});
