const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerId = null;
startBtn.disabled = false;
stopBtn.disabled = true;

stopBtn.addEventListener('click', onStopBtnClick);
startBtn.addEventListener('click', onStartBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function onStartBtnClick() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  timerId = setInterval(changeColor, 1000);
  console.log('Start');
}

function onStopBtnClick() {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  clearInterval(timerId);
  console.log('Stop');
}