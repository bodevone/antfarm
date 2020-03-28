import * as p5 from 'p5'
import '@/styles/style.css'
import * as fabric from 'fabric'

console.log(fabric)

// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('c')
canvas.setDimensions({width:window.innerWidth, height:window.innerHeight});

var circle = new fabric.Circle({
  radius: 100, fill: 'green', left: 100, top: 100
})


var circle2 = new fabric.Circle({
  radius: 100, fill: 'green', left: 400, top: 400
})


canvas.add(circle, circle2)



// function sketch(p) {
//   p.setup = function() {
//     p.createCanvas(window.innerWidth, window.innerHeight)
//     p.frameRate(30)
//   }

//   p.draw = function() {
//     const DIAM = 80


//     p.stroke('#FD8610')
//     p.strokeWeight(6)
//     p.line(200, 200, 350, 100)
//     p.line(350, 100, 500, 200)

//     p.fill('#F5100E')
//     p.circle(200, 200, DIAM)
//     p.circle(500, 200, DIAM)

//     p.fill('#FD8610')
//     p.strokeWeight(0)
//     p.circle(350, 100, DIAM)


//   }
// }

// var app = new p5(sketch, document.body)


