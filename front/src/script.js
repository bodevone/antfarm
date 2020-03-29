import * as fabric from 'fabric'

import '@/styles/style.css'
import '@/styles/style.scss'


// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('c')
canvas.setDimensions({width:window.innerWidth, height:window.innerHeight})

const RADIUS = 50
const LEFT = 100
const TOP = 100

var rooms = []
var connections = []

var selected = false
var id = 0

document.getElementById("add-room").addEventListener("click", () => {

  var c = new fabric.Circle({
    radius: RADIUS,
    stroke: '#666',
    strokeWidth: 5,
    fill: '#fff',
    left: LEFT,
    top: TOP,
    id: id
  })
  id++
    
  c.hasControls = false

  c.lines = []

  canvas.add(c)
  rooms.push(c)


  c.on('mousedown', function(e) {
    // e.target should be the circle
    if (selected) {
      var line = new fabric.Line([selected.left+RADIUS, selected.top+RADIUS, c.left+RADIUS, c.top+RADIUS], {
        stroke: 'red',
        strokeWidth: 5,
        selectable: false,
        id: selected.id + "-" + c.id
      })
      canvas.add(line)

      c.lines.push(line)
      // connections.push()
      selected = false
    } else {
      selected = c
    }
  })

})

canvas.on('object:moving', function(e) {
  var p = e.target
  for (var i=0; i<p.lines.length; i++) {
    p.lines[i] && p.lines[i].set({ 'x1': p.left + RADIUS, 'y1': p.top + RADIUS })
  }
  canvas.renderAll()
})


