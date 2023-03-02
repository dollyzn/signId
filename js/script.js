var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var clear = document.getElementById("clear");

clear.addEventListener("click", (e) => {
  e.preventDefault();
  canvas.width = canvas.width;
});

canvas.width = document.body.clientWidth;
canvas.heigth = 250;

window.addEventListener("resize", function () {
  canvas.width = document.body.clientWidth;
});

const pen = {
  active: false,
  moving: false,
  pos: { x: 0, y: 0 },
  previousPos: null,
};

const draw = (line) => {
  ctx.beginPath();
  ctx.moveTo(line.previousPos.x, line.previousPos.y);
  ctx.lineTo(line.pos.x, line.pos.y);
  ctx.stroke();
};

canvas.addEventListener("mousedown", (e) => {
  pen.active = true;
});

canvas.addEventListener("mouseup", (e) => {
  pen.active = false;
  pen.previousPos = null;
});

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  pen.pos.x = e.clientX - rect.left;
  pen.pos.y = e.clientY - rect.top;
  pen.moving = true;
});

canvas.addEventListener("touchstart", (e) => {
  pen.active = true;
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  pen.pos.x = touch.clientX - rect.left;
  pen.pos.y = touch.clientY - rect.top;
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  pen.pos.x = touch.clientX - rect.left;
  pen.pos.y = touch.clientY - rect.top;
  pen.moving = true;
});

canvas.addEventListener("touchend", (e) => {
  pen.active = false;
  pen.previousPos = null;
});

const animate = () => {
  if (pen.active && pen.moving && pen.previousPos) {
    draw({ pos: pen.pos, previousPos: pen.previousPos });
    pen.moving = false;
  }
  if (pen.active) {
    pen.previousPos = { x: pen.pos.x, y: pen.pos.y };
  }

  requestAnimationFrame(animate);
};

animate();

window.addEventListener(
  "load",
  function () {
    checkOrientation();
    document.getElementById("container4").style.display = "none";
    document.getElementById("container3").style.display = "none";
    document.getElementById("container2").style.display = "none";
    document.getElementById("container1").style.display = "none";
  },
  false
);

function checkOrientation() {
  if (window.innerHeight > window.innerWidth) {
    var control = document.getElementById("ortctrl");

    var image = document.getElementById("rotateimg");
    control.style.display = "none";
    image.style.display = "block";
  } else {
    var control = document.getElementById("ortctrl");
    var image = document.getElementById("rotateimg");
    control.style.display = "block";
    image.style.display = "none";
  }
}

window.addEventListener("orientationchange", checkOrientation, false);
window.addEventListener("resize", checkOrientation, false);

document.getElementById("entrega").addEventListener("click", (e) => {
  document.getElementById("container4").style.display = "none";
  document.getElementById("container3").style.display = "none";
  document.getElementById("container2").style.display = "none";
  document.getElementById("container1").style.display = "block";
  document.getElementById("container").style.display = "none";
});

document.getElementById("rgt1").addEventListener("click", (e) => {
  document.getElementById("container4").style.display = "none";
  document.getElementById("container3").style.display = "none";
  document.getElementById("container2").style.display = "block";
  document.getElementById("container1").style.display = "none";
  document.getElementById("container").style.display = "none";

  document.querySelector(".data").value = new Date()
    .toISOString()
    .substring(0, 16);
});

document.getElementById("rgt2").addEventListener("click", (e) => {
  document.getElementById("container4").style.display = "none";
  document.getElementById("container3").style.display = "block";
  document.getElementById("container2").style.display = "none";
  document.getElementById("container1").style.display = "none";
  document.getElementById("container").style.display = "none";
});

document.getElementById("rgt3").addEventListener("click", (e) => {
  document.getElementById("container4").style.display = "block";
  document.getElementById("container3").style.display = "none";
  document.getElementById("container2").style.display = "none";
  document.getElementById("container1").style.display = "none";
  document.getElementById("container").style.display = "none";
});

document.getElementById("lft1").addEventListener("click", (e) => {
  document.getElementById("container4").style.display = "none";
  document.getElementById("container3").style.display = "none";
  document.getElementById("container2").style.display = "none";
  document.getElementById("container1").style.display = "none";
  document.getElementById("container").style.display = "block";
});

document.getElementById("lft2").addEventListener("click", (e) => {
  document.getElementById("container4").style.display = "none";
  document.getElementById("container3").style.display = "none";
  document.getElementById("container2").style.display = "none";
  document.getElementById("container1").style.display = "block";
  document.getElementById("container").style.display = "none";
});

document.getElementById("lft3").addEventListener("click", (e) => {
  document.getElementById("container4").style.display = "none";
  document.getElementById("container3").style.display = "none";
  document.getElementById("container2").style.display = "block";
  document.getElementById("container1").style.display = "none";
  document.getElementById("container").style.display = "none";
});

document.getElementById("submitcanva").addEventListener("click", (e) => {
  e.preventDefault();
  console.log(canvas.toDataURL());
});
