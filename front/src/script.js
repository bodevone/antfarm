import * as fabric from 'fabric'

import '@/styles/style.css'
import '@/styles/style.scss'

import logo from '@/assets/logo.png'

// create a wrapper around native canvas element (with id='c')
var canvas = new fabric.Canvas('c')
canvas.selection = false
canvas.setDimensions({width:window.innerWidth, height:window.innerHeight})

const RADIUS = 50
const RADIUSANT = 20
const LEFT = 500
const TOP = 200
const COLORMAIN = '#FF652F'
const COLOR = '#FFE400'
const COLORANT = '#14A76C'
const CONNECTION = '#747474'
const animationText = 'Animation in progress'

var rooms = {}
var connections = {}
var data = {}
data.ants = 1

var selected = false
var id = 0

var animation = false

newRoom(LEFT-200, TOP, COLORMAIN)
newRoom(LEFT+200, TOP, COLORMAIN)

document.getElementById('add-room').addEventListener('click', () => {
  if (animation) {
    show(animationText)
    return
  }
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
  c.hasControls = false

  c.lines1 = []
  c.lines2 = []

  
  canvas.add(c)
  canvas.bringToFront(c)
  rooms[id] = c
  if (id!=0 && id!=1) {
    canvas.setActiveObject(c)    
  }

  id++

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
        canvas.sendToBack(line)

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
    if (p.type != 'circle') {
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

document.getElementById('rangePicker').addEventListener('input', event => {
  var value = event.target.value
  data.ants = parseInt(value)
  var ants = document.getElementById('ants')
  ants.textContent = value
})


document.getElementById('delete').addEventListener('click', () => {
  if (animation) {
    show(animationText)
    return
  }
  var act = canvas.getActiveObject()
  if (act) {
    if (act.type == 'line') {
      deleteLine(act)
    } else {
      if (act.id == 0 || act.id == 1) {
        show('Cannot delete main rooms')
      } else {
        canvas.remove(act)
        selected = false
        // rooms = rooms.filter(item => item.id !== act.id)
        delete rooms[act.id]

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
    show('No object selected')
  }
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

var output = {}

const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev
console.log(process.env.SERVER)

document.getElementById('start').addEventListener('click', () => {
  if (animation) {
    show(animationText)
    return
  }
  console.log(data)
  data.rooms = []
  for (var id in rooms) {
    data.rooms.push(parseInt(id))
  }

  data.connections = []
  for (var connection in connections) {
    data.connections.push(connection)
  }

  console.log(data)

  // var URL = 'http://localhost:' 
  var URL = '165.22.28.236:'
  if (isDev) {
    URL = URL + '8081/algo'
  } else {
    URL = URL + '8080/algo'
  }
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((newData) => {
    console.log('Success:', newData)
    output = newData
    animateSetup()
  })
  .catch((error) => {
    console.error('Error:', error)
    show('Error from server')
  })

})

var pressed = false
function show(textShow) {
  if (pressed) {
    return
  }
  pressed = true
  
  var span = document.createElement('span')
  span.classList.add('tag', 'is-large', 'is-warning')

  var text = document.createTextNode(textShow)
  span.appendChild(text)

  var div = document.getElementById('show')

  div.appendChild(span)

  div.style.position = 'absolute'
  div.style.left = '50%'
  div.style.zIndex = 100
  div.style.paddingTop = '5em'

  setTimeout(function() {
    var op = 1;  // initial opacity
    var timer = setInterval(() => {
        if (op <= 0.1){
            clearInterval(timer)
            span.remove()
            div.removeAttribute('style')
            pressed = false
        }
        span.style.opacity = op
        span.style.filter = 'alpha(opacity=' + op * 100 + ')'
        op -= op * 0.1
    }, 30)
  }, 2000)
}

var ants = {}
var antPrevRoom = {}
var end = 100
var animated = []

function animateSetup() {
  if (output.Error) {
    show(output.ErrorMessage)
  } else {
    console.log(output.Steps)
    animation = true

    lockCanvas()

    var left = rooms[0].left + RADIUS - RADIUSANT
    var top = rooms[0].top + RADIUS - RADIUSANT

    for (var i=0; i<data.ants; i++) {
      var ant = new fabric.Circle({
        radius: RADIUSANT,
        fill: COLORANT,
        left: left,
        top: top,
        hasControls: false,
        evented: false
      })
      ants[i+1] = ant
      antPrevRoom[i+1] = rooms[0]
      canvas.add(ant)
    }

    for (var i=0; i<=output.Steps.length; i++) {
      animated.push(false)
    }
    
    setTimeout(animate(0), 1000)
  }
}

function animate(i) {
  var len = 0
  for (var o in output.Steps[i]) {
    len++
  }
  var curr = 0
  for (const [ant, room] of Object.entries(output.Steps[i])) {
    curr++    
    animateAnt(ant, room, i, curr==len)
  }
}

function animateAnt(ant, room, i, last) {

  var fromX = antPrevRoom[ant].left + RADIUS - RADIUSANT
  var fromY = antPrevRoom[ant].top + RADIUS - RADIUSANT

  var toX = rooms[room].left + RADIUS - RADIUSANT
  var toY = rooms[room].top + RADIUS - RADIUSANT

  var dx = (toX - fromX) / end
  var dy = (toY - fromY) / end

  fabric.util.animate({
    startValue: 0,
    endValue: end,
    duration: 1000,
    onChange: function(value) {
      
      var x = dx * value
      var y = dy * value

      ants[ant].set({left: fromX + x, top: fromY + y})
      if (last) {
        ants[ant].setCoords()
        canvas.renderAll()
      }
    },
    onComplete: function() {
      if (output.Steps[i] && !animated[i]) {
        for (const [ant, room] of Object.entries(output.Steps[i])) {
          antPrevRoom[ant] = rooms[room]
        }
        animated[i] = true
        if (output.Steps[i+1]) {
          setTimeout(animate(i+1), 1000)
        } else {
          completed()
        }
      }
    }
  })
}

function lockCanvas() {
  for (var id in rooms) {
    rooms[id].hasControls = false
    rooms[id].evented = false
  }
  for (var link in connections) {
    connections[link].hasControls = false
    connections[link].evented = false
  }
}


function completed() {

  animation = false
  
  unlockCanvas()

  for (var i=0; i<data.ants; i++) {
    canvas.remove(ants[i+1])
  }

  ants = {}
  antPrevRoom = {}
  animated = []
}

function unlockCanvas() {
  for (var id in rooms) {
    rooms[id].evented = true
  }
  for (var link in connections) {
    connections[link].evented = true
  }
}

