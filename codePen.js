var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var mouse = {
  x: undefined,
  y:undefined
}

var maxRadius = 50;
var minRadius = 5

var colorArray =[
  '#00585E',
  '#009494',
  '#F5F2DC',
  '#454445',
  '#ff3300',
  '#FF5729',
  '#00ccff',
];

window.addEventListener('mousemove',
function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
})

window.addEventListener('resize', function()
  {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = minRadius;
  this.color =  colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color
    c.fill();
  }

  this.update = function(){
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0 ) {
      this.dx = -this.dx;
    }

      if (this.y + this.radius > innerHeight ||this.y - this.radius < 0 ) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      if (mouse.x - this.x < 20 && mouse.x - this.x > -20 && mouse.y - this.y < 20 && mouse.y - this.y > -20 && this.radius < maxRadius) {
        this.radius +=25;

      } else if(this.radius > this.minRadius) {
        this.radius -= 0.75;
      }



      this.draw();

    }


}





var circleArray = []

for (var i = 0; i < 800; i++) {
  var radius = Math.random() * 3 + 5;
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  var dx = (Math.random() - 0.5) * 7;
  var dy = (Math.random() - 0.5) * 7;
  circleArray.push(new Circle(x, y, dx, dy, radius));

}

function init(){

  circleArray = [];
  for (var i = 0; i < 950; i++) {
    var radius = Math.random() * 3 + 5;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 6;
    var dy = (Math.random() - 0.5) * 6;
    circleArray.push(new Circle(x, y, dx, dy, radius));


  }
}
function  animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++){
    circleArray[i].update();

  }

}

animate();
