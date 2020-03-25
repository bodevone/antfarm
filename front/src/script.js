import * as p5 from 'p5'
import '@/styles/style.css'


function sketch(p) {
  p.setup = function() {

  }

  p.draw = function() {
    p.ellipse(50, 50, 80, 80);
  }
}

var app = new p5(sketch, document.body)
