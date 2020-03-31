import * as fabric from 'fabric'

import '@/styles/style.css'
import '@/styles/style.scss'
// import "@modules/bulma-extensions/dist/bulma-extensions.min.css"



// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('c')
canvas.setDimensions({width:window.innerWidth, height:window.innerHeight})

const RADIUS = 50
const LEFT = 500
const TOP = 200
const COLORMAIN = '#FF652F'
const COLOR = '#FFE400'
const ANT = '#14A76C'
const CONNECTION = '#747474'

var rooms = []
var connections = {}

var selected = false
var id = 0

newRoom(LEFT-200, TOP, COLORMAIN)
newRoom(LEFT+200, TOP, COLORMAIN)

document.getElementById("add-room").addEventListener("click", () => {
  newRoom(LEFT, TOP, COLOR)
})

function newRoom(left, top, color) {
  var c = new fabric.Circle({
    radius: RADIUS,
    fill: color,
    left: left,
    top: top,
    id: id
  })
  console.log(c)
  id++
    
  c.hasControls = false

  c.lines1 = []
  c.lines2 = []

  canvas.add(c)
  rooms.push(c)

  canvas.setActiveObject(c)

  clickRoom(c)
}

function clickRoom(c) {

  c.on('mousedown', function(e) {
    
    if (selected && selected != c) {
      var temp = order(selected.id, c.id)
      console.log(connections)
      if (!(temp in connections)) {
        if (selected.id < c.id) {
          var line = new fabric.Line([selected.left+RADIUS, selected.top+RADIUS, c.left+RADIUS, c.top+RADIUS], {
            stroke: CONNECTION,
            strokeWidth: 10,
            evented: true,
            id: temp
          })
          selected.lines1.push(line)
          c.lines2.push(line)
        } else {
          var line = new fabric.Line([c.left+RADIUS, c.top+RADIUS, selected.left+RADIUS, selected.top+RADIUS], {
            stroke: CONNECTION,
            strokeWidth: 10,
            id: temp
          })
          c.lines1.push(line)
          selected.lines2.push(line)
        }
        line.room1 = c
        line.room2 = selected

        console.log(line)

        line.lockMovementX = true
        line.lockMovementY = true
        line.lockScalingX = true
        line.lockScalingY = true
        line.lockUniScaling = true
        line.lockRotation = true
        line.hasControls = false

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
}

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
    p.lines1[i] && p.lines1[i].set({ 'x1': p.left + RADIUS, 'y1': p.top + RADIUS })
    p.lines1[i] && p.lines1[i].setCoords()
    p.lines2[i] && p.lines2[i].set({ 'x2': p.left + RADIUS, 'y2': p.top + RADIUS })
    p.lines2[i] && p.lines2[i].setCoords()
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

document.getElementById("delete").addEventListener("click", () => {
  var act = canvas.getActiveObject()
  console.log(act)
  if (act) {
    if (act.type == "line") {
      deleteLine(act)
    } else {
      if (act.id == 0 || act.id == 1) {
        console.log("HOME ROOMS")
      } else {
        canvas.remove(act)
        selected = false
        rooms = rooms.filter(item => item.id !== act.id)
        // Delete line
        if (act.lines1) {
          for (var i=0; i<act.lines1.length; i++) {
            deleteLine(act.lines1[i])
          }
        }
        if (act.lines2) {
          for (var i=0; i<act.lines2.length; i++) {
            deleteLine(act.lines2[i])
          }
        }
      }
    }
  } else {
    console.log("NO ELEMENT SELECTED")
  }

  console.log(act)
})

function deleteLine(act) {
  canvas.remove(act)

  var room1 = act.room1
  var room2 = act.room2

  room1.lines1 = room1.lines1.filter(line => line.id !== act.id)
  room1.lines2 = room1.lines2.filter(line => line.id !== act.id)
  room2.lines1 = room2.lines1.filter(line => line.id !== act.id)
  room2.lines2 = room2.lines2.filter(line => line.id !== act.id)

  delete connections[act.id]
}

document.getElementById("start").addEventListener("click", () => {
  var data = {}
  data.rooms = []
  for (var room of rooms) {
    data.rooms.push(room.id)
  }

  data.connections = []

  for (var connection in connections) {
    data.connections.push(connection)
  }

  console.log(data)
})


