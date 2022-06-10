//////////////////////////////////////////////////////////////////////////////////////////
function setup() {

  createCanvas(window.innerWidth-200, window.innerHeight);

  var ctrl = document.getElementById('ctrl');
  ctrl.style.height = window.innerHeight + 'px';
  ctrl.style.width = 200 + 'px';
  ctrl.style.position = "absolute";
  ctrl.style.top = '0';
  ctrl.style.left = (window.innerWidth-200) + 'px';

  setInterval(function () { document.getElementById('FPS').innerHTML = getFrameRate(); }, 1000);
}
//////////////////////////////////////////////////////////////////////////////////////////
function draw() {
  background(0);
  render();
}