// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   background(220);
// }

// function draw() {
//   strokeWeight(10);
// }

// function mouseDragged() {
//   stroke(255,0,0);
//   line(pmouseX, pmouseY, mouseX, mouseY);
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

let paths = [];
const FADE_DURATION = 5000;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();

  let now = millis();
  paths = paths.filter(p => p.startTime === null || now - p.startTime < FADE_DURATION);

  for (let path of paths) {
    let age = path.startTime ? now - path.startTime : 0;
    let alpha = map(age, 0, FADE_DURATION, 255, 0);
    stroke(255, 0, 100, alpha);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let pt of path.points) {
      curveVertex(pt.x, pt.y);
    }
    endShape();
  }
}

// Prevent drawing if selecting text
document.addEventListener("selectionchange", () => {
  const selection = document.getSelection();

  // If there is any text selected
  if (selection.toString().length) {
    // Remove all drawings
    paths = [];
  }
});

function mousePressed(event) {
  paths.push({ points: [{ x: mouseX, y: mouseY }], startTime: null });
}

function mouseDragged() {
  paths[paths.length - 1].points.push({ x: mouseX, y: mouseY });
}

function mouseReleased() {
  paths[paths.length - 1].startTime = millis();
}