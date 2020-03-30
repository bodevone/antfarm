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
var connections = {}

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
  console.log(c)
  id++
    
  c.hasControls = false

  c.lines1 = []
  c.lines2 = []

  canvas.add(c)
  rooms.push(c)

  c.on('mousedown', function(e) {
      
    // e.target should be the circle
    // var selected = canvas.getActiveObject()

    if (selected && selected != c) {
      var temp = order(selected.id, c.id)
      console.log(connections)
      if (!(temp in connections)) {
        if (selected.id < c.id) {
          var line = new fabric.Line([selected.left+RADIUS, selected.top+RADIUS, c.left+RADIUS, c.top+RADIUS], {
            stroke: 'red',
            strokeWidth: 10,
            evented: true,
            id: temp
          })
          selected.lines1.push(line)
          c.lines2.push(line)
        } else {
          var line = new fabric.Line([c.left+RADIUS, c.top+RADIUS, selected.left+RADIUS, selected.top+RADIUS], {
            stroke: 'red',
            strokeWidth: 10,
            id: temp
          })
          c.lines1.push(line)
          selected.lines2.push(line)
        }

        line.lockMovementX = true
        line.lockMovementY = true
        line.lockScalingX = true
        line.lockScalingY = true
        line.lockUniScaling = true
        line.lockRotation = true
        line.hasControls = false

        line.on('mousedblclick', function(e) {
          canvas.remove(connections[id])
          canvas.renderAll()
          delete connections[id]
        })

        canvas.add(line)

        var name = order(selected.id, c.id)
        connections[name] = line
        selected = false

        canvas.discardActiveObject()
        canvas.requestRenderAll()

      }
    } else {
      selected = c
    }
  })
})

canvas.on('mouse:up', function(e) {
  var p = e.target
  if (p) {
    if (p.type != "circle") {
      selected = false
    }
  } else {
    selected = false
  }
})

canvas.on('object:moving', function(e) {
  var p = e.target
  var length1 = 0
  var length2 = 0
  
  if (p.lines1) {
    length1 = p.lines1.length
  }
  if (p.lines2) {
    length2 = p.lines2.length
  }
  var length = Math.max(length1, length2)
  for (var i=0; i<length; i++) {
    // p.lines[i] && p.lines[i].set({ 'x1': p.left + RADIUS, 'y1': p.top + RADIUS })
    p.lines1[i] && p.lines1[i].set({ 'x1': p.left + RADIUS, 'y1': p.top + RADIUS })
    p.lines2[i] && p.lines2[i].set({ 'x2': p.left + RADIUS, 'y2': p.top + RADIUS })
  }
  canvas.renderAll()
})

function order(num1, num2) {
  let str1 = num1.toString()
  let str2 = num2.toString()
  if (num1 < num2) {
    return str1 + str2
  }
  return str2 + str1
}


